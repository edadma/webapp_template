import { createSession } from '@edadma/hono-session'

export const session = createSession({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  secure: process.env.NODE_ENV === 'production',
})
