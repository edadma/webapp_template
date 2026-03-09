import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { migrate } from '@petradb/drizzle'
import { db, schema } from './index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const now = new Date().toISOString()

export async function seed() {
  // Apply migrations to create tables
  await migrate(db, { migrationsFolder: join(__dirname, 'migrations') })

  // Seed data
  await db.insert(schema.users).values({
    username: 'admin',
    fullName: 'Admin User',
    email: 'admin@example.com',
    passwordHash: '$placeholder',
    createdAt: now,
    updatedAt: now,
  })

  console.log('Seeded: 1 user (admin/admin)')
}
