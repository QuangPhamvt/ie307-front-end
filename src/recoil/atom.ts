import { atom } from "recoil"
import { ATOM_KEY, STATE } from "../utilities"

export type TAuthState = {
  state: STATE
  message: string | null
  contents: {
    id: string | null
    username: string | null
    avatar: string | null
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
      sender_id: string
      receiver_id: string
      message: string
      createAt: string
    }[]
  }
}
export type TFollowListState = {
  state: STATE
  message: string | null
  contents: {
    following_id: string | null
    username: string | null
  }[]
}
export const authState = atom<TAuthState>({
  key: ATOM_KEY.AUTH_STATE_ATOM,
  default: {
    state: "idle",
    message: null,
    contents: {
      id: null,
      username: null,
      avatar: null,
    },
  },
  effects: [
    ({ onSet }) => {
      onSet((user) => {
        console.debug("current user: ", user.contents)
      })
    },
  ],
})
export const chatAtom = atom<TChatState>({
  key: "chatAtom",
  default: {
    state: "idle",
    data: {
      summarized: undefined,
      originChat: undefined,
    },
  },
})
export const followListState = atom<TFollowListState>({
  key: ATOM_KEY.FOLLOW_LIST_STATE,
  default: {
    state: "idle",
    message: null,
    contents: [],
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.debug("current follow list message: ", newValue.message)
      })
    },
  ],
})
