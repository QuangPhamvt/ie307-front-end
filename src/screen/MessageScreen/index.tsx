import React from "react"
import { View, SafeAreaView } from "react-native"
import { RootNativeStackScreenProps } from "~/src/screen/type"
import { MessageListComponent, MessageInputComponent } from "~/src/screen/MessageScreen/components"

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
