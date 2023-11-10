import { atom } from "recoil"

export type TAuthState = {
  state: "hasValue" | "idle" | "loading" | "hasError"
  data: {
    id?: string
    username?: string
    avatar?: string
    message?: string
  }
}
export type TChatState = {
  state: "hasValue" | "idle" | "loading" | "hasError"
  data: {
    summarized?: {
      receiverId: string
      receiver: string
      message: {
        message: string
        createAt: string
      }
    }[]
    originChat?: {
      id: string
      sender_id: string
      receiver_id: string
      message: string
      createAt: string
    }[]
  }
}
export const authState = atom<TAuthState>({
  key: "AuthState",
  default: {
    state: "idle",
    data: {
      id: undefined,
      username: undefined,
      avatar: undefined,
    },
  },
})
export const chatState = atom<TChatState>({
  key: "chatState",
  default: {
    state: "idle",
    data: {
      summarized: undefined,
      originChat: undefined,
    },
  },
})
