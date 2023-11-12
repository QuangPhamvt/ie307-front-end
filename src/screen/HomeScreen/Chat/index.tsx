import React from "react"
import { SafeAreaView, View, Text } from "react-native"
import { HomeTabScreenProps } from "~/src/screen/type"
import { NotificationChat } from "./components"

interface ChatScreenProps extends HomeTabScreenProps<"Chat"> {}
export const ChatScreen: React.FC<ChatScreenProps> = () => {
  return (
    <SafeAreaView className="">
      <View className="flex h-full w-full ">
        <View className="border-b-2 border-gray-500 p-4">
          <Text className="text-center text-xl font-bold">Chat screen</Text>
        </View>
        <NotificationChat />
      </View>
    </SafeAreaView>
  )
}
