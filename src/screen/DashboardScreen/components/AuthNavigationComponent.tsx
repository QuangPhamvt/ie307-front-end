import { View, TouchableOpacity, Text } from "react-native"
import { RootNativeStackScreenProps } from "~/src/screen/type"
interface AuthNavigationProps extends RootNativeStackScreenProps<"Dashboard"> {
  className: string
}
export const AuthNavigationComponent: React.FC<Partial<AuthNavigationProps>> = (props) => {
  const { className, navigation } = props
  return (
    <View className={className + "flex flex-row items-center justify-around pb-2"}>
      <TouchableOpacity
        className="w-5/12 rounded-md border-[1px] p-4"
        onPress={() => {
          navigation?.push("Login")
        }}
      >
        <Text className="text-center font-bold text-black">LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-5/12 rounded-md border-[1px] bg-black p-4"
        onPress={() => {
          navigation?.push("Register")
        }}
      >
        <Text className="text-center font-bold text-white">REGISTER</Text>
      </TouchableOpacity>
    </View>
  )
}
