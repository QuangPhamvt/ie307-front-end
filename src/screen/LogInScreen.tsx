import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native"
import { RootNativeStackScreenProps } from "./type"
interface LogInScreenProps extends RootNativeStackScreenProps<"Login"> {}
interface LogInFormComponentProps {}
const LogInFormComponent = (props: LogInFormComponentProps) => {
  return (
    <View className="flex w-full justify-center gap-y-2 p-2">
      <TextInput className="border-2 border-black p-4" placeholder="email@example.com" />
      <TextInput className="border-2 border-black p-4" placeholder="password" />
      <TouchableOpacity className="bg-black p-4">
        <Text className="text-center text-xl font-bold text-white">Log In</Text>
      </TouchableOpacity>
    </View>
  )
}
export const LogInScreen = (props: LogInScreenProps) => {
  const { navigation } = props
  return (
    <SafeAreaView className="flex h-full w-full gap-y-4" onTouchStart={() => Keyboard.dismiss()}>
      <View className="px-4 pt-4">
        <Ionicons name="return-up-back-outline" size={32} color={"#ccc"} onPress={() => navigation.goBack()} />
      </View>
      <View className="px-4">
        <Text className="text-5xl">Log In</Text>
      </View>
      <LogInFormComponent />
    </SafeAreaView>
  )
}
