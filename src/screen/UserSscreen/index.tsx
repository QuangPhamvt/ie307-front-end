import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import React from "react"
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Alert } from "react-native"
import { RootNativeStackParamList } from "../type"
import UserAction from "./store/hook"
import { useRecoilValue } from "recoil"
import { originUserState } from "./store"
import { useDoubleTap } from "~/src/hooks"

export const HeaderProfileComponent: React.FC = () => {
  const {
    params: { userId },
  } = useRoute<RouteProp<RootNativeStackParamList, "User">>()
  const navigate = useNavigation()
  const { handleGetOriginUser } = UserAction.useGetOriginUser()
  const { handlePostFollowing } = UserAction.usePostFollowingState()
  const { handlePostUnFollow } = UserAction.usePostUnFollowState()
  React.useEffect(() => {
    handleGetOriginUser(userId)
  }, [userId])

  const {
    contents: { user, isFollowing },
  } = useRecoilValue(originUserState)
  const buttonAlert = () =>
    Alert.alert("", "Are you sure about this?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => handlePostUnFollow(userId),
        style: "destructive",
      },
    ])
  const { handleDoubleTap } = useDoubleTap(buttonAlert, 300)
  return (
    <View className="flex w-full items-center justify-center gap-y-4 pt-8">
      <View className="flex h-48 w-48 items-center justify-center rounded-full bg-black">
        {user?.avatar && <Image className="h-full w-full rounded-full" source={{ uri: user.avatar }} />}
      </View>
      <View className="flex items-center justify-center">
        {/* <ProfileHeaderComponent /> */}
        <View className="mt-6 flex items-center justify-center">
          <Text className="text-3xl font-bold">{user?.username}</Text>
          <Text className="mt-2">SAN FRANCISCO, CA</Text>
        </View>
      </View>
      <View className="flex w-full gap-y-2">
        <View className="w-full rounded-lg bg-black p-4 ">
          {isFollowing && (
            <TouchableOpacity onPress={() => handleDoubleTap()}>
              <Text className="text-center text-xl font-bold text-white">FOLLOWING</Text>
            </TouchableOpacity>
          )}
          {!isFollowing && (
            <TouchableOpacity onPress={() => handlePostFollowing(userId)}>
              <Text className="text-center text-xl font-bold text-white">FOLLOW</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigate.navigate("Message", { userId })}
          className="w-full rounded-lg border-2 border-black bg-white p-3"
        >
          <Text className="text-center text-xl font-bold text-black">MESSAGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const UserScreen = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="h-full w-full bg-white p-4">
        <HeaderProfileComponent />
      </ScrollView>
    </SafeAreaView>
  )
}
export default UserScreen
