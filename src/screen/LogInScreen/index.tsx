import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native"
import { RootNativeStackScreenProps } from "../type"
import React from "react"
import { LogInFormComponent } from "~/src/screen/LogInScreen/components"
import { useResetRecoilState } from "recoil"
import { authState } from "~/src/recoil/atom"
interface LogInScreenProps extends RootNativeStackScreenProps<"Login"> {}
const LogInScreen = (props: LogInScreenProps) => {
  const { navigation } = props
  const resetAuth = useResetRecoilState(authState)
  return (
    <SafeAreaView className="flex w-full h-full bg-black gap-y-4" onTouchStart={() => Keyboard.dismiss()}>
      <View className="flex w-full h-full bg-white gap-y-4">
        <View className="px-4 pt-4">
          <Ionicons
            name="return-up-back-outline"
            size={32}
            color={"#ccc"}
            onPress={() => {
              resetAuth()
              navigation.goBack()
            }}
          />
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
