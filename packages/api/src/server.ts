import { serve } from '@hono/node-server'
import app from './app.js'
import { seed } from './db/seed.js'

const port = Number(process.env.PORT) || 3000

async function start() {
  await seed()
  serve({ fetch: app.fetch, port }, () => {
    console.log(`API server running on http://localhost:${port}`)
  })
}

start()
