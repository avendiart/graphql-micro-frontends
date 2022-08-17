export { Submit } from './screens/submit'

type RootStackParamList = {
  Submit: {}
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
