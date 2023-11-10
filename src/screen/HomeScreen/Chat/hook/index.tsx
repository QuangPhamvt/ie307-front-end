import { useRecoilState } from "recoil"
import { chatApi } from "~/src/api"
import { chatState } from "~/src/recoil/atom"
import React from "react"

export const useChatAction = () => {
  const [chat, setChat] = useRecoilState(chatState)
  const useGetSummarized = React.useCallback(async () => {
    try {
      setChat({ ...chat, state: "loading" })
      const response = await chatApi.getSummarized()
      console.log(response.data)
      setChat({ state: "hasValue", data: { summarized: response.data } })
    } catch (error: any) {
      setChat({ ...chat, state: "hasError" })
      console.log(error.data)
    }
  }, [])
  const useGetOriginChat = React.useCallback<(payload: string) => void>(async (payload) => {
    try {
      setChat({ ...chat, state: "loading" })
      const response = await chatApi.postOriginChat(payload)
      console.log(response.data)
      setChat((preState) => ({
        state: "hasValue",
        data: {
          summarized: preState.data.summarized,
          originChat: response.data,
        },
      }))
    } catch (error: any) {
      setChat({ ...chat, state: "hasError" })
      console.log(error.data)
    }
  }, [])
  return { useGetSummarized, useGetOriginChat }
}
