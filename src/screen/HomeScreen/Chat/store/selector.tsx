import { selector } from "recoil"
import { chatAtom } from "~/src/recoil/atom"

export const chatSelector = selector({
  key: "chatSelector",
  get: ({ get }) => {
    return get(chatAtom)
  },
})
