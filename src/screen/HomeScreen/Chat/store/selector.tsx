import { selector } from "recoil"
import { chatState } from "../../../../recoil/atom"

export const chatSelector = selector({
  key: "chatSelector",
  get: ({ get }) => {
    return get(chatState)
  },
})
