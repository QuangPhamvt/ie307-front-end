import React from "react"
import { View, TextInput, TouchableOpacity, Text, Pressable, ActivityIndicator } from "react-native"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { logInState } from "./atom"
import { useUserAction } from "../../hooks"
import { authState } from "../../recoil/atom"

interface LogInFormComponentProps {}
export const LogInFormComponent = (props: LogInFormComponentProps) => {
  const [logIn, setLogIn] = useRecoilState(logInState)
  const resetLogIn = useResetRecoilState(logInState)
  const userAction = useUserAction()
  const auth = useRecoilValue(authState)
  return (
    <View className="flex w-full justify-center gap-y-2 p-2">
      <TextInput
        onChangeText={(text) => setLogIn({ ...logIn, email: text })}
        className="border-2 border-black p-4"
        placeholder="email@example.com"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={(text) => setLogIn({ ...logIn, password: text })}
        className="border-2 border-black p-4"
        placeholder="password"
        keyboardType="visible-password"
        secureTextEntry={true}
      />
      {auth.state === "hasError" && (
        <View className="px-2 ">
          <Text className="text-red-600">Email or password wrong</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          userAction.logIn(logIn)
          resetLogIn()
        }}
        className="bg-black p-4"
      >
        {userAction.isLoading ? (
          <View className="py-1">
            <ActivityIndicator size={"small"} />
          </View>
        ) : (
          <Text className="text-center text-xl font-bold text-white">Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
