import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { useSetRecoilState } from "recoil"
import { chatAtom } from "~/src/recoil/atom"
import ChatAction from "../../HomeScreen/Chat/hook"

export const MessageScreenHeader = () => {
  const navigator = useNavigation()
  const setChatAtom = useSetRecoilState(chatAtom)
  const { handleSetChatListState } = ChatAction.useGetSummarized()
  return (
    <SafeAreaView className="z-[9999] bg-white">
      <View className="flex flex-row items-center justify-start space-x-4 border-t-[1px] border-solid border-gray-200 p-4">
        <TouchableOpacity
          onPress={() => {
            setChatAtom((preState) => ({ ...preState, data: { ...preState.data, originChat: undefined } }))
            handleSetChatListState()
            navigator.goBack()
          }}
        >
          <Entypo name="chevron-left" size={24} />
        </TouchableOpacity>
        <View className="">
          <Text className="text-lg font-bold">CustomAFK</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
