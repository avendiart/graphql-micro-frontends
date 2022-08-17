export { Login } from './screens/login'
export { Signup } from './screens/signup'

type RootStackParamList = {
  Login: {}
  Signup: {}
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export {}
