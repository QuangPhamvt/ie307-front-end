import React from "react"
import { HomeTabScreenProps } from "../../type"
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useUserAction } from "../../../hooks"
import { useRecoilValue } from "recoil"
import { profileSelect } from "./store/atom"
import { ProfileHeaderComponent, UploadAvatarModalComponent } from "./components"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}
export const HeaderProfileComponent = () => {
  const userAction = useUserAction()
  const profile = useRecoilValue(profileSelect)
  return (
    <View className="flex w-full items-center justify-center gap-y-4 pt-8">
      <UploadAvatarModalComponent />
      <View className="flex items-center justify-center">
        <ProfileHeaderComponent />
        <View className="mt-6 flex items-center justify-center">
          <Text className="text-3xl font-bold">{profile.username}</Text>
          <Text className="mt-2">SAN FRANCISCO, CA</Text>
        </View>
      </View>
      <View className="flex w-full gap-y-2">
        <TouchableOpacity className="w-full rounded-lg bg-black p-4 ">
          <Text className="text-center text-xl font-bold text-white">FOLLOW ME</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-full rounded-lg border-2 border-black bg-white p-3">
          <Text className="text-center text-xl font-bold text-black">MESSAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            userAction.logOut()
          }}
          className="w-full rounded-lg border-2 border-gray-500 bg-gray-300 p-1"
        >
          <Text className="text-center text-base font-medium text-black">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="h-full w-full bg-white p-4">
        <HeaderProfileComponent />
      </ScrollView>
    </SafeAreaView>
  )
}
