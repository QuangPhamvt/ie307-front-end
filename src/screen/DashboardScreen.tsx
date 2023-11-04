import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Image, Text, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native"
import { RootNativeStackScreenProps } from "./type"
import React from "react"

interface AuthBackGroundProps {
  className: string
}
interface AuthNavigationProps extends RootNativeStackScreenProps<"Dashboard"> {
  className: string
}
interface DashboardScreenProps extends RootNativeStackScreenProps<"Dashboard"> {}

const AuthBackGroundComponent: React.FC<Partial<AuthBackGroundProps>> = (props) => {
  return <Image className="h-full w-full" source={require("../../assets/bg-auth.webp")} />
}

const AuthNavigationComponent: React.FC<Partial<AuthNavigationProps>> = (props) => {
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
const DashboardScreen = (props: DashboardScreenProps) => {
  const { navigation } = props
  return (
    <SafeAreaView className="flex h-full w-full justify-around  bg-black">
      <View className="flex h-full w-full justify-center bg-transparent bg-white">
        <View className="mb-2 shrink">
          <AuthBackGroundComponent />
        </View>
        <AuthNavigationComponent className="shrink-0 " navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}
export default DashboardScreen
