import { atom } from "recoil"

type TTextSendMessageAtom = string
export const textSendMessageAtom = atom<TTextSendMessageAtom>({
  key: "textSendMessageAtom",
  default: "",
})
