import { RouteProp, useRoute } from "@react-navigation/native"
import React from "react"
import { View, ScrollView } from "react-native"
import { RootNativeStackParamList } from "../../type"
import MessageAction from "../store/hook"
import { useRecoilValue } from "recoil"
import { messageListState } from "../store"
import { MessageItemComponent } from "./MessageItemComponent"

export const MessageListComponent: React.FC = () => {
  const scrollViewRef = React.useRef<any>(null)
  const {
    params: { userId },
  } = useRoute<RouteProp<RootNativeStackParamList, "Message">>()
  const { handleGetListMessage } = MessageAction.useGetListMessage()
  React.useEffect(() => {
    handleGetListMessage(userId)
  }, [])
  const { state, content } = useRecoilValue(messageListState)
  MessageAction.useGetMessage()
  return (
    <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      <View className="flex flex-col-reverse mb-2">
        {state === "hasValue" && content.length > 0 && (
          <>
            {content.map((item, index) => {
              return <MessageItemComponent key={index} user={item.user} messages={item.messages} />
            })}
          </>
        )}
      </View>
    </ScrollView>
  )
}
