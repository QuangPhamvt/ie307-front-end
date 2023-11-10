import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, Text, SafeAreaView, TextInput } from "react-native"
import { RootNativeStackScreenProps } from "~/src/screen/type"
const data = (message: Array<any>) => {
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
  for (let i = 1; i < message.length; i++) {
    if (message[i - 1].sender_id === message[i].sender_id) {
      payload[payload.length - 1] = {
        ...payload[payload.length - 1],
        message: [
          ...payload[i].message,
          {
            message: message[i].message,
            createAt: message[i].createAt,
          },
        ],
      }
    }
    if (message[i - 1].sender_id !== message[i].sender_id) {
      payload = [
        ...payload,
        {
          sender_id: message[i].sender_id,
          message: [
            {
              message: message[i].message,
              createAt: message[i].createAt,
            },
          ],
        },
      ]
    }
  }
  return payload
}

interface MessageScreenProps extends RootNativeStackScreenProps<"Message"> {}
const MessageScreen: React.FC<MessageScreenProps> = (props) => {
  const {} = props
  return (
    <SafeAreaView className="h-full bg-gray-200">
      <View className="h-[90%] px-2">
        <View className="flex flex-row space-x-2">
          <View className="h-12 w-12 bg-red-400" />
          <View className="flex">
            <Text>Message screen</Text>
          </View>
        </View>
      </View>
      <View className="flex h-[10%] items-center justify-center bg-gray-700 px-4">
        <View className="flex w-full flex-row items-center justify-center rounded-lg border-2 border-gray-900 p-2">
          <TextInput className="w-[95%]" />
          <Ionicons name="md-send-sharp" size={24} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MessageScreen
