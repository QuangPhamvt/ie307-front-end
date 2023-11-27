import { useRecoilState, useSetRecoilState } from "recoil"
import { chatApi } from "~/src/api"
import { chatAtom } from "~/src/recoil/atom"
import React from "react"
import { chatListState } from "../store/atom"

export const useChatAction = () => {
  const [chat, setChat] = useRecoilState(chatAtom)
  const useGetSummarized = React.useCallback(async () => {
    try {
      setChat({ ...chat, state: "loading" })
      const response = await chatApi.getSummarized()
      console.log("Get summarized chat")
      setChat({ state: "hasValue", data: { summarized: response.data } })
    } catch (error: any) {
      setChat({ ...chat, state: "hasError" })
      console.log(error.data)
    }
  }, [])
  const useGetOriginChat = React.useCallback<(receiver_id: string) => void>(async (receiver_id) => {
    try {
      setChat({ ...chat, state: "loading" })
      const response = await chatApi.postOriginChat(receiver_id)
      console.log(response.data)

      console.log("Get originChat chat")
      setChat((preState) => ({
        state: "hasValue",
        data: {
          summarized: preState.data.summarized,
          originChat:
            response.data.length != 0
              ? response.data.map((item: any) => {
                  if (item?.sender_id)
                    return {
                      sender_id: item.sender_id,
                      receiver_id: item.receiver_id,
                      message: item.message,
                      createAt: item.createAt,
                    }
                })
              : undefined,
        },
      }))
    } catch (error: any) {
      setChat({ ...chat, state: "hasError" })
      console.log(error.data)
    }
  }, [])
  // const useSetOrginChat = React.useCallback<{}>(() => {}, [])
  return { useGetSummarized, useGetOriginChat }
}

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
