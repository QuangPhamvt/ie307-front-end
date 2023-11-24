import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import React from "react"
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { RootNativeStackParamList } from "../type"

export interface HeaderProfileComponentProps {
  userId: string
}
export const HeaderProfileComponent: React.FC<HeaderProfileComponentProps> = (props) => {
  const { userId } = props
  const navigate = useNavigation()
  return (
    <View className="flex w-full items-center justify-center gap-y-4 pt-8">
      <View className="flex h-48 w-48 items-center justify-center rounded-full bg-black">
        <Text>aaa</Text>
      </View>
      <View className="flex items-center justify-center">
        {/* <ProfileHeaderComponent /> */}
        <View className="mt-6 flex items-center justify-center">
          <Text className="text-3xl font-bold">Minh Thu</Text>
          <Text className="mt-2">SAN FRANCISCO, CA</Text>
        </View>
      </View>
      <View className="flex w-full gap-y-2">
        <TouchableOpacity className="w-full rounded-lg bg-black p-4 ">
          <Text className="text-center text-xl font-bold text-white">FOLLOW</Text>
        </TouchableOpacity>
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
  const {
    params: { userId },
  } = useRoute<RouteProp<RootNativeStackParamList, "User">>()
  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="h-full w-full bg-white p-4">
        <HeaderProfileComponent userId={userId} />
      </ScrollView>
    </SafeAreaView>
  )
}
export default UserScreen
