import { atom } from "recoil"
export type TSearchAtom = {
  state: "idle" | "loading" | "hasValue" | "hasError"
  data?: {
    id: string
    author: {
      username: string
      avatar: string | null
    }
    image: string
    createAt: string
    slug: string
    published: number
  }[]
}
export const searchAtom = atom<TSearchAtom>({
  key: "searchAtom",
  default: {
    state: "idle",
    data: undefined,
  },
})

export const textSearchAtom = atom<string>({
  key: "textSearchAtom",
  default: "",
})
