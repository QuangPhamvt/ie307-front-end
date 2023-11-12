import { View, ScrollView } from "react-native"
import { MessageItemComponent } from "./MessageItemComponent"
import { useRecoilValue } from "recoil"
import { authState, chatAtom } from "~/src/recoil/atom"
import React from "react"
import { useChatAction } from "~/src/screen/HomeScreen/Chat/hook"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootNativeStackParamList } from "~/src/screen/type"
import { useConvertData } from "../store"

export const MessageListComponent: React.FC = () => {
  const scrollViewRef = React.useRef<any>(null)
  const router = useRoute<RouteProp<RootNativeStackParamList, "Message">>()
  const auth = useRecoilValue(authState)
  const [data, setData] = React.useState<any>()
  const getChatAtomSelect = useRecoilValue(chatAtom)
  const { useGetOriginChat } = useChatAction()
  React.useEffect(() => {
    useGetOriginChat(router.params.userId || "")
  }, [])
  React.useEffect(() => {
    if (getChatAtomSelect.data.originChat) setData(useConvertData(getChatAtomSelect.data.originChat))
  }, [getChatAtomSelect.data.originChat])
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
