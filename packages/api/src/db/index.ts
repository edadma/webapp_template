import { Session } from '@petradb/engine'
import { drizzle } from '@petradb/drizzle'
import * as schema from './schema.js'

const session = new Session({ storage: 'memory' })

export const db = drizzle(session, { schema })
export { schema }
