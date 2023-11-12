import React from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootNativeStackParamList } from "../../type"
import { useSendMessage } from "../store/hook"

export const MessageInputComponent = () => {
  const router = useRoute<RouteProp<RootNativeStackParamList, "Message">>()
  const { textSendMessage, setTextSendMessage, handleSubmit } = useSendMessage(router.params.userId)
  return (
    <View className="flex w-full flex-row items-center justify-center rounded-lg border-2 p-2">
      <TextInput
        onChangeText={(text) => setTextSendMessage(text)}
        value={textSendMessage}
        className="w-[95%] text-black"
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Ionicons name="md-send-sharp" size={24} />
      </TouchableOpacity>
    </View>
  )
}
