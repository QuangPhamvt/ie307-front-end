import React from "react"
import { ScrollView } from "react-native"
import { useRecoilValue } from "recoil"
import { chatAtom } from "~/src/recoil/atom"
import { useChatAction } from "~/src/screen/HomeScreen/Chat/hook"
import { NotificationChatItem } from "./NotificationChatItem"

interface NotificationChatComponentProps {}
export const NotificationChat: React.FC<NotificationChatComponentProps> = () => {
  const getChat = useRecoilValue(chatAtom)
  const { useGetSummarized } = useChatAction()
  React.useEffect(() => {
    useGetSummarized()
  }, [])
  return (
    <ScrollView>
      {getChat.data.summarized &&
        getChat.data.summarized.map((items) => {
          return (
            <NotificationChatItem
              key={items.receiverId}
              userId={items.receiverId}
              username={items.receiver}
              message={items.message.message}
            />
          )
        })}
    </ScrollView>
  )
}
