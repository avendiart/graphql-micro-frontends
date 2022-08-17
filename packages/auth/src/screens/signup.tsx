import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { Button, Input, Stack } from 'components'
import { useSignupUserMutation } from '../graphql/module'

export const Signup = () => {
  const navigation = useNavigation()
  const [signupUser] = useSignupUserMutation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
            const { data } = await signupUser({
              variables: {
                input: {
                  email,
                  password,
                },
              },
            })

            if (data?.signupUser?.id) {
              navigation.navigate('Login', {})
            }
          }
        }}
      >
        Signup
      </Button>
    </Stack>
  )
}
