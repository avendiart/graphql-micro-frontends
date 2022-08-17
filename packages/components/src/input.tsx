import { TextInput, TextInputProps } from "react-native";

export const Input = ({ style, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#888888"
      style={[
        {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#aaaaaa",
          borderRadius: 4,
          paddingTop: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 16,
          lineHeight: 24,
          fontSize: 16,
        },
        style,
      ]}
    />
  );
};
