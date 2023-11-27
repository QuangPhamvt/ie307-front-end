import { atom } from "recoil"
import { STATE } from "~/src/utilities"

type TWebsocket = {
  state: STATE
  ws: WebSocket | null
}
export const websocketState = atom<TWebsocket>({
  key: "websocketStateAtom",
  default: {
    state: "idle",
    ws: null,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.log("WebSocket state: ", newValue.state)
      })
    },
  ],
})
