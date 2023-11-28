import { View, Text, Image, TouchableOpacity } from "react-native"
import { useRecoilValue } from "recoil"
import { authState } from "~/src/recoil/atom"
import { Feather } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootNativeStackParamList } from "../../type"

type TMessageItemComponentProps = {
  user: {
    user_id: string
    username: string
    avatar: string | null
  }
  messages: {
    message: string
    create_at: Date
  }[]
}
export const MessageItemComponent: React.FC<TMessageItemComponentProps> = (props) => {
  const {
    user: { user_id, avatar },
    messages,
  } = props
  const navigation = useNavigation<NavigationProp<RootNativeStackParamList, "User">>()
  const {
    contents: { id },
  } = useRecoilValue(authState)
  return (
    <View className={`flex ${user_id === id ? "flex-row-reverse" : "flex-row"} items-end py-2 `}>
      <TouchableOpacity onPress={() => navigation.navigate("User", { userId: user_id })}>
        <View className="mx-1 flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-solid border-gray-400">
          {avatar && <Image className="w-full h-full rounded-full" source={{ uri: avatar }} />}
          {!avatar && <Feather name="user" size={26} />}
        </View>
      </TouchableOpacity>
      <View
        className={`flex max-w-[60%] flex-col-reverse ${
          user_id === id ? "items-end" : "items-start"
        } space-y-[2px] pb-1`}
      >
        {messages.map((message, index) => (
          <View key={index} className="flex px-4 py-2 mb-1 bg-blue-400 rounded-2xl">
            <Text>{message.message}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
