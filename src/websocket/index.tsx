import React from "react"
import { SetterOrUpdater, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { TChatState, authState, chatAtom } from "../recoil/atom"
import { websocketState } from "./store"

type TWsWebsocket = {
  state: "idle" | "hasValue" | "Loading" | "hasError"
  data: {
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
export const wsAtom = atom<TWsWebsocket>({
  key: "WebSocketState",
  default: {
    state: "idle",
    data: {
      notification: undefined,
      chat: undefined,
    },
  },
})

const connection = (id: string) => {
  const ws = new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`)
  ws.onopen = () => {
    console.log("Connected to server")
  }
  ws.onmessage = () => {
    console.log("Have message")
  }
  ws.onclose = (e) => {
    console.log("Socket is closed. Reconnect will be attempted in 1 second.", e.reason)
    setTimeout(() => connection(id), 1000)
  }
}

const useWebSocket = () => {
  const {
    state,
    contents: { id },
  } = useRecoilValue(authState)
  const { state: StateWs, ws } = useRecoilValue(websocketState)
  const setWs = useSetRecoilState(websocketState)
  React.useEffect(() => {
    if (state === "hasValue" && StateWs === "idle") {
      setWs({
        state: "hasValue",
        ws: new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`),
      })
    }
    if (state === "hasValue" && StateWs === "hasValue" && ws) {
      ws.onopen = () => {
        console.log("Connected to the Server")
        console.log("readyState: ", ws.readyState)
      }
      ws.onclose = (e) => {
        console.log("Socket is closed. Reconnect will be attempted in 1 second.", e.reason)
        setTimeout(() => {
          setWs({ state: "idle", ws: null })
        }, 1000)
      }
    }
  }, [state, StateWs])
}

const WebsocketAction = {
  useWebSocket,
}

export default WebsocketAction
