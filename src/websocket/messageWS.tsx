import { useRecoilState, useSetRecoilState } from "recoil"
import { wsAtom } from "."
import { TChatState, chatAtom } from "../recoil/atom"
import React from "react"

export const useMessageWs = (id: string) => {
  const [wsState, setWsState] = useRecoilState(wsAtom)
  const setChatAtom = useSetRecoilState(chatAtom)
  React.useEffect(() => {
    const ws = new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`)
    ws.onopen = () => {}
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.chat) {
        console.log("message chat")
        setChatAtom((preState): TChatState => {
          if (
            (preState.data.originChat && preState.data.originChat[0].sender_id === data.chat.sender_id) ||
            (preState.data.originChat && preState.data.originChat[0].receiver_id === data.chat.sender_id)
          )
            return {
              state: preState.state,
              data: {
                summarized: preState.data.summarized?.map((item) => {
                  if (item.receiverId === data.chat.sender_id) {
                    return {
                      ...item,
                      message: {
                        message: data.chat.message,
                        createAt: Date.now().toString(),
                      },
                    }
                  }
                  return item
                }),
                originChat: [
                  {
                    sender_id: data.chat.sender_id,
                    receiver_id: id,
                    message: data.chat.message,
                    createAt: Date.now().toString(),
                  },
                  ...preState.data.originChat,
                ],
              },
            }
          return {
            state: preState.state,
            data: {
              summarized: preState.data.summarized?.map((item) => {
                if (item.receiverId === data.chat.sender_id) {
                  return {
                    ...item,
                    message: {
                      message: data.chat.message,
                      createAt: Date.now().toString(),
                    },
                  }
                }
                return item
              }),
              originChat: preState.data.originChat,
            },
          }
        })
        setWsState((preState) => ({
          state: "hasValue",
          data: { notification: preState.data.notification, chat: data.chat },
        }))
      }
    }
  }, [])
}
