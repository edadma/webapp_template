import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { session } from '../session.js'
import { db, schema } from '../db/index.js'

type Variables = { session: Record<string, unknown> }

export const authRoutes = new Hono<{ Variables: Variables }>()
  .post('/login', async (c) => {
    const { username, password } = await c.req.json<{
      username: string
      password: string
    }>()

    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400)
    }

    const user = await db.query.users.findFirst({
      where: eq(schema.users.username, username),
    })

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    // TODO: real password verification
    await session.login(c, { id: user.id })
    return c.json({ ok: true })
  })
  .post('/logout', (c) => {
    session.logout(c)
    return c.json({ ok: true })
  })
  .get('/me', session.authMiddleware, async (c) => {
    const sess = c.get('session') as { id: number }

    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, sess.id),
      columns: {
        id: true,
        username: true,
        fullName: true,
        email: true,
      },
    })

    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json({ data: user })
  })
