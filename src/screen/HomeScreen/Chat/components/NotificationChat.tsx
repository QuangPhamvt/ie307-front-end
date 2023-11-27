import React from "react"
import { ScrollView } from "react-native"
import { useRecoilValue } from "recoil"
import { NotificationChatItem } from "./NotificationChatItem"
import ChatAction from "../hook"
import { chatListState } from "../store/atom"

interface NotificationChatComponentProps {}
export const NotificationChat: React.FC<NotificationChatComponentProps> = () => {
  const { state, contents } = useRecoilValue(chatListState)
  const { handleSetChatListState } = ChatAction.useGetSummarized()
  React.useEffect(() => {
    handleSetChatListState()
  }, [])
  return (
    <ScrollView>
      {state === "hasValue" &&
        contents.length > 0 &&
        contents.map((items) => {
          if (!items.user || !items.message) return null
          return <NotificationChatItem user={items.user} message={items.message} key={items.user?.user_id} />
        })}
    </ScrollView>
  )
}
