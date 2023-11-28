import { atom } from "recoil"
import { STATE } from "~/src/utilities"

type TTextSendMessageAtom = {
  state: STATE
  text: string | null
}
type TMessageListState = {
  state: STATE
  message: string | null
  content: {
    user: {
      user_id: string
      avatar: string | null
      username: string
    }
    messages: {
      message: string
      create_at: Date
    }[]
  }[]
}
export const textSendMessageAtom = atom<TTextSendMessageAtom>({
  key: "textSendMessageAtom",
  default: {
    state: "idle",
    text: null,
  },
})

export const messageListState = atom<TMessageListState>({
  key: "messageListStateAtom",
  default: {
    state: "idle",
    message: null,
    content: [],
  },
})
