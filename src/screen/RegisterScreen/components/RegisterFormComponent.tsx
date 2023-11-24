import React from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { authState } from "~/src/recoil/atom"
import { registerFormState } from "../store"
import Auth from "~/src/hooks/AuthAction"

interface RegisterFormComponentProps {}
export const RegisterFormComponent = (props: RegisterFormComponentProps) => {
  const { state, message } = useRecoilValue(authState)
  const setRegisterForm = useSetRecoilState(registerFormState)
  const [step, setStep] = React.useState<number>(1)
  const { handleRegister } = Auth.useRegister()
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
            onChangeText={(text) =>
              setRegisterForm((preState) => ({
                ...preState,
                state: "hasValue",
                contents: { ...preState.contents, email: text },
              }))
            }
            className="border-2 border-black p-4"
            placeholder="email@example.com"
          />
          <TextInput
            onChangeText={(text) =>
              setRegisterForm((preState) => ({
                ...preState,
                state: "hasValue",
                contents: { ...preState.contents, password: text },
              }))
            }
            className="border-2 border-black p-4"
            placeholder="password"
          />
          {state === "hasError" && (
            <View className="px-2">
              <Text className="text-red-400">{message}</Text>
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
            onChangeText={(text) =>
              setRegisterForm((preState) => ({
                ...preState,
                state: "hasValue",
                contents: { ...preState.contents, username: text },
              }))
            }
            className="border-2 border-black p-4"
            placeholder="username"
          />
          {state === "hasError" && (
            <View className="px-2">
              <Text className="text-red-400">{message}</Text>
            </View>
          )}
          <View className="flex w-full flex-row items-center justify-around">
            <TouchableOpacity onPress={handlePreStep} className="w-[48%] rounded-lg border-2 border-black bg-white p-4">
              <Text className="rounded-md text-center text-xl font-bold text-black">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleRegister()
              }}
              className="w-[48%] rounded-lg border-2 bg-black p-4"
            >
              {state === "isLoading" ? (
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
