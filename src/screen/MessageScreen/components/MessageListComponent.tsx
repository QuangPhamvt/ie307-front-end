import React from "react"
import { View, ScrollView } from "react-native"
import { useRecoilValue } from "recoil"
import { authState, chatAtom } from "~/src/recoil/atom"
import { useChatAction } from "~/src/screen/HomeScreen/Chat/hook"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootNativeStackParamList } from "~/src/screen/type"
import { useConvertData } from "../store"
import { MessageItemComponent } from "./MessageItemComponent"
import { useMessageWs } from "~/src/websocket/messageWS"

export const MessageListComponent: React.FC = () => {
  const scrollViewRef = React.useRef<any>(null)
  const router = useRoute<RouteProp<RootNativeStackParamList, "Message">>()
  const auth = useRecoilValue(authState)
  const [data, setData] = React.useState<any>()
  const {
    data: { originChat },
  } = useRecoilValue(chatAtom)
  const { useGetOriginChat } = useChatAction()
  React.useEffect(() => {
    useGetOriginChat(router.params.userId || "")
  }, [])
  useMessageWs(auth.data.id || "")
  React.useEffect(() => {
    if (originChat) setData(useConvertData(originChat))
  }, [originChat])
  return (
    <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      <View className="mb-2 flex flex-col-reverse">
        {data &&
          data.map((item: any, index: any) => (
            <MessageItemComponent key={index} messages={item.message} isUser={item.sender_id === auth.data.id} />
          ))}
      </View>
    </ScrollView>
  )
}
