import React from "react"
import { HomeTabScreenProps } from "../type"
import { SafeAreaView, View, Text, ScrollView } from "react-native"

interface ChatScreenProps extends HomeTabScreenProps<"Chat"> {}
interface NoficationChatComponentProps {}
const mockData: { username: string; message: string }[] = [
  {
    username: "CustomAFK",
    message: "Hello, what is your name",
  },
  {
    username: "ABC",
    message: "Hello, this me adsasdasdasdasdasdasddsa wiorjoqwj asdname",
  },
]
const NoficationChat: React.FC<NoficationChatComponentProps> = () => {
  return (
    <ScrollView>
      {mockData.map((items) => {
        return (
          <View key={items.username} className="flex w-full flex-row items-center border-b-2 border-gray-400 p-1">
            <View className="ml-2 h-16 w-16 rounded-full bg-slate-700" />
            <View className="ml-2 mr-8 flex h-full items-start justify-center gap-y-2">
              <Text className="font-bold">{items.username}</Text>
              <Text className="break-all font-light">{items.message}</Text>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}
export const ChatScreen: React.FC<ChatScreenProps> = () => {
  return (
    <SafeAreaView className="bg-black">
      <View className="flex h-full w-full bg-white">
        <View className="border-b-2 border-gray-500 p-4">
          <Text className="text-center text-xl font-bold">Chat screen</Text>
        </View>
        <NoficationChat />
      </View>
    </SafeAreaView>
  )
}
