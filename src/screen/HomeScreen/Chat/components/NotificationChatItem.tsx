import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity, Image } from "react-native"

export const NotificationChatItem: React.FC<{
  user: {
    user_id: string
    avatar: string
    username: string
  }
  message: {
    user_id: string
    message: string
    createAt: Date
  }
}> = (props) => {
  const { user, message } = props
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate({ name: "Message", params: { userId: user.user_id } })}>
      <View className="flex w-full flex-row items-center border-b-2 border-gray-400 p-1">
        <View className="ml-2 h-16 w-16 rounded-full bg-slate-700">
          {user.avatar && <Image source={{ uri: user.avatar }} className="h-full w-full rounded-full" />}
        </View>
        <View className="ml-2 mr-8 flex h-full items-start justify-center gap-y-2">
          <Text className="font-bold">{user.username}</Text>
          <Text className="break-all font-light">{message.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
