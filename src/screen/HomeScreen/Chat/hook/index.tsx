import { useSetRecoilState } from "recoil"
import { chatApi } from "~/src/api"
import { chatListState } from "../store/atom"

const useGetSummarized = () => {
  const setChatListState = useSetRecoilState(chatListState)
  const handleSetChatListState = async () => {
    try {
      setChatListState({ state: "isLoading", message: null, contents: [] })
      const {
        data: { data, message },
      } = await chatApi.getSummarized()
      setChatListState((preState) => ({ ...preState, state: "hasValue", message, contents: data }))
    } catch (error: any) {
      setChatListState({ state: "hasError", message: error.data.message, contents: [] })
    }
  }
  return { handleSetChatListState }
}

const ChatAction = {
  useGetSummarized,
}
export default ChatAction
