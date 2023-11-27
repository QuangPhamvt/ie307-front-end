import { atom } from "recoil"
import { STATE } from "~/src/utilities"

type TChatListState = {
  state: STATE
  message: string | null
  contents: {
    user: {
      user_id: string
      avatar: string
      username: string
    } | null
    message: {
      user_id: string
      message: string
      createAt: Date
    }
  }[]
}
export const chatListState = atom<TChatListState>({
  key: "chatListStateAtom",
  default: {
    state: "idle",
    message: null,
    contents: [],
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.debug("Chat List: ", newValue.contents)
      })
    },
  ],
})
