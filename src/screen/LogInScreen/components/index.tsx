import React from "react"
import { View, TextInput, TouchableOpacity, Text, Pressable, ActivityIndicator } from "react-native"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { authState } from "~/src/recoil/atom"
import { logInState } from "../store"
import Auth from "~/src/hooks/AuthAction"

interface LogInFormComponentProps {}
export const LogInFormComponent = (props: LogInFormComponentProps) => {
  const { handleLogIn } = Auth.useLogIn()
  const setLogIn = useSetRecoilState(logInState)
  const resetLogIn = useResetRecoilState(logInState)
  const { state, contents } = useRecoilValue(authState)
  return (
    <View className="flex w-full justify-center gap-y-2 p-2">
      <TextInput
        onChangeText={(text) =>
          setLogIn((preState) => ({ state: "hasValue", contents: { ...preState.contents, email: text } }))
        }
        className="border-2 border-black p-4"
        placeholder="email@example.com"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={(text) =>
          setLogIn((preState) => ({ state: "hasValue", contents: { ...preState.contents, password: text } }))
        }
        className="border-2 border-black p-4"
        placeholder="password"
        keyboardType="visible-password"
        secureTextEntry={true}
      />
      {state === "hasError" && (
        <View className="px-2 ">
          <Text className="text-red-600">Email or password wrong</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          handleLogIn()
          resetLogIn()
        }}
        className="bg-black p-4"
      >
        {state === "isLoading" ? (
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
