import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native"
import { RootNativeStackScreenProps } from "../type"
import React from "react"
import { LogInFormComponent } from "~/src/screen/LogInScreen/components"
interface LogInScreenProps extends RootNativeStackScreenProps<"Login"> {}
const LogInScreen = (props: LogInScreenProps) => {
  const { navigation } = props
  return (
    <SafeAreaView className="flex h-full w-full gap-y-4 bg-black" onTouchStart={() => Keyboard.dismiss()}>
      <View className="flex h-full w-full gap-y-4 bg-white">
        <View className="px-4 pt-4">
          <Ionicons name="return-up-back-outline" size={32} color={"#ccc"} onPress={() => navigation.goBack()} />
        </View>
        <View className="px-4">
          <Text className="text-5xl">Log In</Text>
        </View>
        <LogInFormComponent />
      </View>
    </SafeAreaView>
  )
}
export default LogInScreen
