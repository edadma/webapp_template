import { useQuery } from '@tanstack/react-query'
import { client } from './api'

export interface User {
  id: number
  username: string
  fullName: string
  email: string
}

export function useAuth() {
  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await client.api.auth.me.$get()
      if (!res.ok) return null
      const body = await res.json() as { data: User }
      return body.data
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
  }
}
