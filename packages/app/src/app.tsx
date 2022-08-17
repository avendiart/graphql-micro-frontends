import { ApolloProvider } from '@apollo/client'
import {
  LinkingOptions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Signup } from 'auth'
import { Submit } from 'submission'
import 'modern-normalize'
import { Text } from 'react-native'
import './app.css'
import { client } from './graphql/client'
import { Mediator } from './mediator'

const Stack = createNativeStackNavigator()

const linking: LinkingOptions<{
  Login: {}
  Signup: {}
  Submit: {}
}> = {
  prefixes: [],
  config: {
    screens: {
      Login: 'login',
      Signup: 'signup',
      Submit: 'submit',
    },
  },
}

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Submit" component={Submit} />
        </Stack.Navigator>
        <Mediator />
      </NavigationContainer>
    </ApolloProvider>
  )
}
