import React from "react"
import { DefaultValue, SetterOrUpdater, atom, selector, useRecoilState, useRecoilValue } from "recoil"

// export const ws = (id: string) => {
//   return new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`)
// }
// export const useOpenWs = (id: string) => {
//   ws(id).onopen = () => {
//     ws(id).send("Connection")
//   }
// }
type TWsWebsocket = {
  state: "idle" | "hasValue" | "Loading" | "hasError"
  data: {
    notification?: {
      username?: string
      notificationId: string
      userId?: string
      isMessage?: string
    }
    message?: string
  }
}
const wsAtom = atom<TWsWebsocket>({
  key: "WebSocketState",
  default: {
    state: "idle",
    data: {
      notification: undefined,
      message: undefined,
    },
  },
})
// const wsSelector = selector({
//   key: "WebSocketSelector",
//   get: ({ get }) => {
//     const { data, state } = get(wsState)
//     return { data, state }
//   },
//   set: ({ set }, newValue) => set(wsState, newValue instanceof DefaultValue ? newValue : newValue),
// })
export const useWebSocket = (id?: string) => {
  const [wsState, setWsState] = useRecoilState(wsAtom)
  React.useEffect(() => {
    if (!id) return
    if (id) initialWebSocketConnect(id, wsState, setWsState)
  }, [id])
  console.log(wsState)
}
const initialWebSocketConnect = (id: string, wsState: TWsWebsocket, setWsState: SetterOrUpdater<TWsWebsocket>) => {
  const ws = new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`)
  ws.onopen = () => {}
  console.log("Websocket have a message: ", id)
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.notification) {
      console.log("notification")
      console.log(data.notification)

      setWsState({ state: "hasValue", data: { notification: data.notification } })
    }
    if (data.message) {
      console.log("message")
      console.log(data.message)

      setWsState({ state: "hasValue", data: { message: data.message } })
    }
  }
}
