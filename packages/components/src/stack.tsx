import { Children, cloneElement, isValidElement } from 'react'
import { View, ViewProps } from 'react-native'

export const Stack = ({ children, style, ...props }: ViewProps) => {
  return (
    <View
      {...props}
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
          margin: -8,
        },
        style,
      ]}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            style: [{ margin: 8 }, child.props.style],
          })
        }
        return child
      })}
    </View>
  )
}
