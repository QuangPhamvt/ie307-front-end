import { useRecoilState } from "recoil"
import { chatApi } from "../../../../api"
import { chatState } from "../../../../recoil/atom"
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
  return { useGetSummarized }
}
