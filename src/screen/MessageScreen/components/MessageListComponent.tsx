import { View, Text } from "react-native"
import { MessageItemComponent } from "./MessageItemComponent"
import { useRecoilValue } from "recoil"
import { chatAtom } from "~/src/recoil/atom"
import React from "react"
import { useChatAction } from "~/src/screen/HomeScreen/Chat/hook"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootNativeStackParamList } from "~/src/screen/type"

export const useConvertData = (
  message: Array<{ sender_id: string; receiver_id: string; message: string; createAt: string }>,
) => {
  let payload = [
    {
      sender_id: message[0].sender_id,
      message: [
        {
          message: message[0].message,
          createAt: message[0].createAt,
        },
      ],
    },
  ]
  for (let i = 1; i < message.length - 1; i++) {
    if (message[i - 1].sender_id === message[i].sender_id) {
      payload[payload.length - 1] = {
        ...payload[payload.length - 1],
        message: [
          ...payload[payload.length - 1].message,
          {
            message: message[i].message,
            createAt: message[i].createAt,
          },
        ],
      }
    }
    if (message[i - 1].sender_id !== message[i].sender_id) {
      payload.push({
        sender_id: message[i].sender_id,
        message: [
          {
            message: message[i].message,
            createAt: message[i].createAt,
          },
        ],
      })
    }
  }
  return payload
}
export const MessageListComponent: React.FC = () => {
  const router = useRoute<RouteProp<RootNativeStackParamList, "Message">>()
  const [data, setData] = React.useState<any>()
  const getChatAtomSelect = useRecoilValue(chatAtom)
  const { useGetOriginChat } = useChatAction()
  React.useEffect(() => {
    useGetOriginChat(router.params.userId || "")
  }, [])
  React.useEffect(() => {
    if (getChatAtomSelect.data.originChat) setData(useConvertData(getChatAtomSelect.data.originChat))
  }, [getChatAtomSelect])
  return (
    <View>
      {data &&
        data.map((item: any, index: any) => (
          <MessageItemComponent
            key={index}
            messages={item.message}
            isUser={item.sender_id === "4673a282-7e39-11ee-9ea3-063ae024"}
          />
        ))}
    </View>
  )
}
