import { Pressable, PressableProps, Text, ViewProps } from "react-native";

export const Button = ({
  style,
  children,
  ...props
}: PressableProps & ViewProps) => (
  <Pressable
    {...props}
    style={[
      {
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        backgroundColor: "green",
        borderRadius: 4,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: "white",
        lineHeight: 24,
        fontSize: 16,
      }}
    >
      {children}
    </Text>
  </Pressable>
);
