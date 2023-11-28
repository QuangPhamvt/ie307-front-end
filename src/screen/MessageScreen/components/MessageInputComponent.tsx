import React from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootNativeStackParamList } from "../../type"
import { useRecoilState, useSetRecoilState } from "recoil"
import { textSendMessageAtom } from "../store"
import MessageAction from "../store/hook"

export const MessageInputComponent = () => {
  const {
    params: { userId },
  } = useRoute<RouteProp<RootNativeStackParamList, "Message">>()
  console.log(userId)
  const [getTextSendMessage, setTextSendMessage] = useRecoilState(textSendMessageAtom)
  const { handleSendMessage } = MessageAction.useSendMessage()
  return (
    <View className="flex flex-row items-center justify-center w-full p-2 border-2 rounded-lg">
      <TextInput
        value={getTextSendMessage.text || ""}
        className="w-[90%] px-2 text-black"
        onChangeText={(text) => setTextSendMessage({ state: "hasValue", text })}
      />
      <TouchableOpacity onPress={() => handleSendMessage(userId)}>
        <Ionicons name="md-send-sharp" size={16} />
      </TouchableOpacity>
    </View>
  )
}
