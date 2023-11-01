import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native"
import { RootNativeStackScreenProps } from "./type"
interface RegisterScreenProps extends RootNativeStackScreenProps<"Register"> {}
interface RegisterFormComponentProps {}
const RegisterFormComponent = (props: RegisterFormComponentProps) => {
  const [step, setStep] = React.useState<number>(1)
  const handleNextStep = () => {
    setStep((preState) => ++preState)
  }
  const handlePreStep = () => {
    setStep((preState) => --preState)
  }
  return (
    <>
      {step === 1 && (
        <View className="flex w-full justify-center gap-y-2 p-2">
          <TextInput className="border-2 border-black p-4" placeholder="email@example.com" />
          <TextInput className="border-2 border-black p-4" placeholder="password" />
          <TouchableOpacity onPress={handleNextStep} className="rounded-lg bg-black p-4">
            <Text className="rounded-md text-center text-xl font-bold text-white">Next</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
        <View className="flex w-full justify-center gap-y-2 p-2">
          <TextInput className="border-2 border-black p-4" placeholder="username" />
          <View className="flex w-full flex-row items-center justify-around">
            <TouchableOpacity onPress={handlePreStep} className="w-[48%] rounded-lg border-2 border-black bg-white p-4">
              <Text className="rounded-md text-center text-xl font-bold text-black">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePreStep} className="w-[48%] rounded-lg border-2 bg-black p-4">
              <Text className="rounded-md text-center text-xl font-bold text-white">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}
export const RegisterScreen = (props: RegisterScreenProps) => {
  const { navigation } = props
  return (
    <SafeAreaView className="flex h-full w-full gap-y-4" onTouchStart={() => Keyboard.dismiss()}>
      <View className="px-4 pt-4">
        <Ionicons name="return-up-back-outline" size={32} color={"#ccc"} onPress={() => navigation.goBack()} />
      </View>
      <View className="px-4">
        <Text className="text-5xl">Register</Text>
      </View>
      <RegisterFormComponent />
    </SafeAreaView>
  )
}
