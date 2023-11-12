import React from "react"
import { SetterOrUpdater, atom, useRecoilState, useSetRecoilState } from "recoil"
import { TChatState, chatAtom } from "../recoil/atom"

type TWsWebsocket = {
  state: "idle" | "hasValue" | "Loading" | "hasError"
  data: {
    ws?: any
    notification?: {
      username?: string
      notificationId: string
      userId?: string
      isMessage?: string
    }
    chat?: {
      sender_id: string
      message: string
    }
  }
}
const wsAtom = atom<TWsWebsocket>({
  key: "WebSocketState",
  default: {
    state: "idle",
    data: {
      ws: undefined,
      notification: undefined,
      chat: undefined,
    },
  },
})
export const useWebSocket = (id?: string) => {
  const [wsState, setWsState] = useRecoilState(wsAtom)
  const setChatAtom = useSetRecoilState(chatAtom)
  React.useEffect(() => {
    if (!id) return
    if (id) initialWebSocketConnect(id, setWsState, setChatAtom)
  }, [id])
  console.log("WsAtom have: ", wsState.state)
}
const initialWebSocketConnect = (
  id: string,
  setWsState: SetterOrUpdater<TWsWebsocket>,
  setChatAtom: SetterOrUpdater<TChatState>,
) => {
  const ws = new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`)
  ws.onopen = () => {}
  console.log("Websocket have a message: ", id)
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.notification) {
      console.log("message notification")
      setWsState({ state: "hasValue", data: { notification: data.notification } })
    }
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
      setWsState({ state: "hasValue", data: { chat: data.chat } })
    }
  }
  setWsState((preState) => ({ ...preState, data: { ...preState.data, ws } }))
}
