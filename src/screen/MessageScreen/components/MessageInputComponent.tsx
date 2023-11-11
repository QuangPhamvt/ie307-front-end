import { Ionicons } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native"
import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useSetRecoilState } from "recoil"
import { chatAtom } from "~/src/recoil/atom"

export const MessageInputComponent = () => {
  const setOriginChatAtom = useSetRecoilState(chatAtom)
  const router = useRoute()
  console.log(router.params)
  return (
    <View className="flex w-full flex-row items-center justify-center rounded-lg border-2 border-gray-900 p-2">
      <TextInput className="w-[95%] text-white" />
      <TouchableOpacity>
        <Ionicons name="md-send-sharp" size={24} />
      </TouchableOpacity>
    </View>
  )
}
