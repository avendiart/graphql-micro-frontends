import { useState } from 'react'

import { Button, Input, Stack } from 'components'
import {
  useLoginUserMutation,
  useUserLoggedInSubscription,
} from '../graphql/module'

export const Login = () => {
  const [loginUser] = useLoginUserMutation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useUserLoggedInSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      alert(
        `User has been logged in: ${subscriptionData.data?.userLoggedIn.email}`,
      )
    },
  })

  return (
    <Stack
      style={{
        padding: 16,
      }}
    >
      <Input
        placeholder="E-Mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        onPress={async () => {
          if (email != null && password != null) {
            const { data } = await loginUser({
              variables: {
                input: {
                  email,
                  password,
                },
              },
            })
          }
        }}
      >
        Login
      </Button>
    </Stack>
  )
}
