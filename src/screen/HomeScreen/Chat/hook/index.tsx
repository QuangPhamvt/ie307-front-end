import { useRecoilState } from "recoil"
import { chatApi } from "~/src/api"
import { chatAtom } from "~/src/recoil/atom"
import React from "react"

export const useChatAction = () => {
  const [chat, setChat] = useRecoilState(chatAtom)
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
  const useGetOriginChat = React.useCallback<(receiver_id: string) => void>(async (receiver_id) => {
    try {
      setChat({ ...chat, state: "loading" })
      const response = await chatApi.postOriginChat(receiver_id)

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
  // const useSetOrginChat = React.useCallback<{}>(() => {}, [])
  return { useGetSummarized, useGetOriginChat }
}
