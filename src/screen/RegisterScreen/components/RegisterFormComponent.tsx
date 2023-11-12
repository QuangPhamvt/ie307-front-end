import React from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { RegisterFormState } from "~/src/screen/RegisterScreen/store"
import { useUserAction } from "~/src/hooks"
import { authState } from "~/src/recoil/atom"

interface RegisterFormComponentProps {}
export const RegisterFormComponent = (props: RegisterFormComponentProps) => {
  const [step, setStep] = React.useState<number>(1)
  const auth = useRecoilValue(authState)
  const userAction = useUserAction()
  const [registerForm, setRegisterForm] = useRecoilState(RegisterFormState)
  const resetRegister = useResetRecoilState(RegisterFormState)
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
          <TextInput
            onChangeText={(text) => setRegisterForm({ ...registerForm, email: text })}
            className="border-2 border-black p-4"
            placeholder="email@example.com"
          />
          <TextInput
            onChangeText={(text) => setRegisterForm({ ...registerForm, password: text })}
            className="border-2 border-black p-4"
            placeholder="password"
          />
          {auth.state === "hasError" && (
            <View className="px-2">
              <Text className="text-red-400">{auth.data.message}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleNextStep} className="rounded-lg bg-black p-4">
            <Text className="rounded-md text-center text-xl font-bold text-white">Next</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
        <View className="flex w-full justify-center gap-y-2 p-2">
          <TextInput
            onChangeText={(text) => setRegisterForm({ ...registerForm, username: text })}
            className="border-2 border-black p-4"
            placeholder="username"
          />
          {auth.state === "hasError" && (
            <View className="px-2">
              <Text className="text-red-400">{auth.data.message}</Text>
            </View>
          )}
          <View className="flex w-full flex-row items-center justify-around">
            <TouchableOpacity onPress={handlePreStep} className="w-[48%] rounded-lg border-2 border-black bg-white p-4">
              <Text className="rounded-md text-center text-xl font-bold text-black">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                userAction.register(registerForm)
                resetRegister()
              }}
              className="w-[48%] rounded-lg border-2 bg-black p-4"
            >
              {userAction.isLoading ? (
                <View className="p-1">
                  <ActivityIndicator size={"small"} />
                </View>
              ) : (
                <Text className="rounded-md text-center text-xl font-bold text-white">Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}
