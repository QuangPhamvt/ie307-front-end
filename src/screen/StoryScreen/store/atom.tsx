import { atom } from "recoil"
type TOriginPostAtom = {
  state: "idle" | "hasValue" | "loading" | "hasError"
  data?: {
    id: string
    title: string
    image: string
    authorId: string
    authorUsername: string
    authorAvatar: string | null
  }
}
export const originPostAtom = atom<TOriginPostAtom>({
  key: "originPost",
  default: {
    state: "idle",
    data: undefined,
  },
})
