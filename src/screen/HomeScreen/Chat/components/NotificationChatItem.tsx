import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import dayjs from "dayjs"
import { useRecoilValue } from "recoil"
import { authState } from "~/src/recoil/atom"
import { CustomImage } from "~/src/components"

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
  const {
    contents: { id },
  } = useRecoilValue(authState)
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate({ name: "Message", params: { userId: user.user_id } })}>
      <View className="flex w-full flex-row items-center justify-between space-x-2 border-b-[1px] border-gray-400 px-2 py-4">
        <View className="border-gray-30 ml-2 flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-solid">
          {user.avatar && <CustomImage source={{ uri: user.avatar }} className="w-full h-full rounded-full" />}

          {!user.avatar && <Feather name="user" size={32} />}
        </View>
        <View className="flex items-start justify-end w-3/5 h-full ml-2 ">
          <Text className="text-lg font-bold">{user.username}</Text>
          <Text className="font-medium break-all">{`${message.user_id === id ? "You:" : ""} ${message.message}`}</Text>
        </View>
        <View className="flex items-start justify-start w-1/5 h-full ">
          <Text className="text-xs">{dayjs(message.createAt).format("ddd DD/MM")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
