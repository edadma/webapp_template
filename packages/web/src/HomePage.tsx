import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Flex, Typography } from 'asterui'
import { useAuth } from './useAuth'
import { client } from './api'

const { Title, Paragraph } = Typography

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await client.api.auth.logout.$post()
    },
    onSuccess: () => {
      queryClient.clear()
      navigate('/login')
    },
  })

  return (
    <Flex justify="center" align="center" minHeight="screen" className="bg-base-200 p-4">
      <Card className="w-full max-w-md">
        <Title level={3}>Welcome, {user?.fullName}</Title>
        <Paragraph className="text-base-content/70">
          You are logged in as <strong>{user?.username}</strong>.
        </Paragraph>
        <Button
          color="neutral"
          variant="outline"
          onClick={() => logoutMutation.mutate()}
          loading={logoutMutation.isPending}
        >
          Sign Out
        </Button>
      </Card>
    </Flex>
  )
}
