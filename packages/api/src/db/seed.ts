import { db, schema } from './index.js'

const now = new Date().toISOString()

export async function seed() {
  await db.$session.execute(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `)

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
