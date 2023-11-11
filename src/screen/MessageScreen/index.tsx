import React from "react"
import { View, SafeAreaView } from "react-native"
import { RootNativeStackScreenProps } from "~/src/screen/type"
import { MessageListComponent, MessageInputComponent } from "~/src/screen/MessageScreen/components"
export const useConvertData = (
  message: Array<{ id: string; sender_id: string; receiver_id: string; message: string; createAt: string }>,
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

interface MessageScreenProps extends RootNativeStackScreenProps<"Message"> {}
const MessageScreen: React.FC<MessageScreenProps> = (props) => {
  return (
    <SafeAreaView className="h-full bg-gray-200">
      <View className="h-[90%] px-2">
        <MessageListComponent />
      </View>
      <View className="flex h-[10%] items-center justify-center bg-gray-700 px-4">
        <MessageInputComponent />
      </View>
    </SafeAreaView>
  )
}

export default MessageScreen
