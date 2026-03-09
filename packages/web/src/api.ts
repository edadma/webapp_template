import { hc } from 'hono/client'
import type { AppType } from '@my-app/api'

export const client = hc<AppType>('/')
