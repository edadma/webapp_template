import { Hono } from 'hono'
import { authRoutes } from './routes/auth.js'

type Variables = { session: Record<string, unknown> }

const app = new Hono<{ Variables: Variables }>()
  .basePath('/api')
  .route('/auth', authRoutes)

export type AppType = typeof app
export default app
