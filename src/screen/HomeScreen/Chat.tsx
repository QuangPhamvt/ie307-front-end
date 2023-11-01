import React from "react"
import { HomeTabScreenProps } from "../type"
import { SafeAreaView, View, Text } from "react-native"

interface ChatScreenProps extends HomeTabScreenProps<"Chat"> {}
export const ChatScreen: React.FC<ChatScreenProps> = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Chat screen</Text>
      </View>
    </SafeAreaView>
  )
}
