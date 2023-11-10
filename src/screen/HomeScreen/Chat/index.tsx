import React from "react"
import { HomeTabScreenProps } from "~/src/screen/type"
import { SafeAreaView, View, Text, ScrollView } from "react-native"
import { useChatAction } from "./hook"
import { useRecoilValue } from "recoil"
import { chatState } from "~/src/recoil/atom"

interface ChatScreenProps extends HomeTabScreenProps<"Chat"> {}
interface NotificationChatComponentProps {}
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
            <NotificationChatItem key={items.receiverId} username={items.receiver} message={items.message.message} />
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
