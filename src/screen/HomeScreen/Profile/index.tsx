import React from "react"
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { ProfileHeaderComponent, UploadAvatarModalComponent } from "./components"
import { authState } from "~/src/recoil/atom"
import Auth from "~/src/hooks/AuthAction"

export const HeaderProfileComponent = () => {
  const { handleLogOut } = Auth.useLogOut()
  const { contents } = useRecoilValue(authState)
  return (
    <View className="relative flex items-center justify-center w-full pt-8 gap-y-4">
      <UploadAvatarModalComponent />
      <View className="absolute top-0 h-36 w-screen border-b-[1px] border-solid border-gray-300 bg-gray-400" />
      <View className="flex items-center justify-center">
        <ProfileHeaderComponent />
        <View className="flex items-center justify-center mt-6">
          <Text className="text-3xl font-bold">{contents.username}</Text>
          <Text className="mt-2">SAN FRANCISCO, CA</Text>
        </View>
      </View>
      <View className="flex w-full gap-y-2">
        <TouchableOpacity
          onPress={() => {
            handleLogOut()
          }}
          className="w-full p-1 bg-gray-300 border-2 border-gray-500 rounded-lg"
        >
          <Text className="text-base font-medium text-center text-black">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="w-full h-full p-4 bg-white">
        <HeaderProfileComponent />
      </ScrollView>
    </SafeAreaView>
  )
}
