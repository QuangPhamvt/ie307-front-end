import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity } from "react-native"

export const NotificationChatItem: React.FC<{
  userId: string
  username: string
  message: string
}> = (props) => {
  const { userId, username, message } = props
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate({ name: "Message", params: { userId } })}>
      <View key={username} className="flex w-full flex-row items-center border-b-2 border-gray-400 p-1">
        <View className="ml-2 h-16 w-16 rounded-full bg-slate-700" />
        <View className="ml-2 mr-8 flex h-full items-start justify-center gap-y-2">
          <Text className="font-bold">{username}</Text>
          <Text className="break-all font-light">{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
