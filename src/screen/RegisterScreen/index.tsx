import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, View, Text, Keyboard } from "react-native"
import { RootNativeStackScreenProps } from "../type"
import { RegisterFormComponent } from "./components"
import { useResetRecoilState } from "recoil"
import { authState } from "~/src/recoil/atom"
interface RegisterScreenProps extends RootNativeStackScreenProps<"Register"> {}
const RegisterScreen = (props: RegisterScreenProps) => {
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
          <Text className="text-5xl">Register</Text>
        </View>
        <RegisterFormComponent />
      </View>
    </SafeAreaView>
  )
}
export default RegisterScreen
