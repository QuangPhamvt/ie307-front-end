import { selector, selectorFamily } from "recoil"
import { authState } from "./atom"

export const authSelectorFamily = selectorFamily<void, { id: string; username: string; avatar: string }>({
  key: "authSelectorFamily",
  get: () => () => {},
  set:
    (params) =>
    ({ set }) => {
      set(authState, { state: "hasValue", data: params })
    },
})
