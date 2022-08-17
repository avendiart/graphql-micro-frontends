import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { pubsub } from './pubsub'

export const Mediator = () => {
  const navigation = useNavigation()
  useEffect(() => {
    let id: number | undefined
    const listener = () => {
      navigation.navigate('Submit', {})
    }
    pubsub.subscribe('user-logged-in', listener).then((subscriptionId) => {
      id = subscriptionId
    })
    return () => {
      if (id) {
        pubsub.unsubscribe(id)
      }
    }
  })
  return null
}
