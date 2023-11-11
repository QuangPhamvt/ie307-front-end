import { View, Text } from "react-native"
export const MessageItemComponent: React.FC<{
  messages: Array<{ message: string; createAt: string }>
  isUser: boolean
}> = (props) => {
  const { messages, isUser } = props
  return (
    <View className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-end py-2 `}>
      <View className="mx-1 h-12 w-12 rounded-full bg-red-400" />
      <View className="flex max-w-[60%] flex-wrap items-start space-y-[2px] pb-1">
        {messages.map((message) => (
          <View key={message.createAt} className="flex rounded-2xl bg-blue-400 px-4 py-2">
            <Text>{message.message}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
