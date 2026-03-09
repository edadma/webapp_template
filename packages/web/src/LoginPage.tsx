import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  Checkbox,
  Button,
  Card,
  Flex,
  Space,
  Divider,
  Typography,
} from 'asterui'
import { client } from './api'

const { Link, Paragraph } = Typography

export default function LoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState('')

  const loginMutation = useMutation({
    mutationFn: async (values: { username: string; password: string }) => {
      const res = await client.api.auth.login.$post({
        json: values,
      })
      if (!res.ok) {
        const body = await res.json() as { error?: string }
        throw new Error(body.error || 'Login failed')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      navigate('/')
    },
    onError: (err: Error) => {
      setError(err.message)
    },
  })

  const handleSubmit = (values: { username: string; password: string; remember: boolean }) => {
    setError('')
    loginMutation.mutate(values)
  }

  return (
    <Flex justify="center" align="center" minHeight="screen" className="bg-base-200 p-4">
      <Card title="Sign In" className="w-full max-w-sm">
        <Form onFinish={handleSubmit} initialValues={{ remember: false }}>
          {error && (
            <div className="bg-error/10 text-error text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input className="w-full" placeholder="your username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input className="w-full" type="password" placeholder="Enter your password" />
          </Form.Item>
          <Space justify="between" align="center" className="mb-4">
            <Form.Item name="remember" valuePropName="checked" inline>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link size="sm">Forgot password?</Link>
          </Space>
          <Button
            color="primary"
            htmlType="submit"
            shape="block"
            loading={loginMutation.isPending}
          >
            Sign In
          </Button>
          <Divider>or</Divider>
          <Paragraph align="center" size="sm">
            Don't have an account? <Link>Sign up</Link>
          </Paragraph>
        </Form>
      </Card>
    </Flex>
  )
}
