import { atom, useRecoilState } from "recoil"

export type TAuthState = {
  state: "hasValue" | "idle" | "loading" | "hasError"
  data:
    | {
        id: string
        username: string
        avatar: string
      }
    | {}
}
export const authState = atom<TAuthState>({
  key: "AuthState",
  default: {
    state: "idle",
    data: {},
  },
})
