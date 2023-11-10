import React from "react"
import { HomeTabScreenProps } from "../../type"
import { SafeAreaView, View, Text, ScrollView } from "react-native"
import { useChatAction } from "./hook"
import { useRecoilState, useRecoilValue } from "recoil"
import { chatState } from "../../../recoil/atom"

interface ChatScreenProps extends HomeTabScreenProps<"Chat"> {}
interface NotificationChatComponentProps {}
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
const NotificationChatItem: React.FC<{ username: string; message: string }> = (props) => {
  const { username, message } = props
  return (
    <View key={username} className="flex w-full flex-row items-center border-b-2 border-gray-400 p-1">
      <View className="ml-2 h-16 w-16 rounded-full bg-slate-700" />
      <View className="ml-2 mr-8 flex h-full items-start justify-center gap-y-2">
        <Text className="font-bold">{username}</Text>
        <Text className="break-all font-light">{message}</Text>
      </View>
    </View>
  )
}
const NotificationChat: React.FC<NotificationChatComponentProps> = () => {
  const getChat = useRecoilValue(chatState)
  const { useGetSummarized } = useChatAction()
  React.useEffect(() => {
    useGetSummarized()
  }, [])
  return (
    <ScrollView>
      {getChat.data.summarized &&
        getChat.data.summarized.map((items) => {
          return (
            <View key={items.receiverId} className="flex w-full flex-row items-center border-b-2 border-gray-400 p-1">
              <View className="ml-2 h-16 w-16 rounded-full bg-slate-700" />
              <View className="ml-2 mr-8 flex h-full items-start justify-center gap-y-2">
                <Text className="font-bold">{items.receiver}</Text>
                <Text className="break-all font-light">{items.message.message}</Text>
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
        <NotificationChat />
      </View>
    </SafeAreaView>
  )
}
