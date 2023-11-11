import { selector } from "recoil"
import { chatAtom } from "~/src/recoil/atom"

export const originChatSelector = selector({
  key: "originChatSelector",
  get: ({ get }) => {
    return get(chatAtom).data.originChat
  },
})
