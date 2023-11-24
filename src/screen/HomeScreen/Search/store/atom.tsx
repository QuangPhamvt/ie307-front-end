import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"
export type TSearchResponseState = {
  state: STATE
  message: string | null
  contents: {
    post_id: string
    image: string
    slug: string
    published: number
    createAt: string
    author: {
      author_id: string
      username: string
      avatar: string | null
    }
  }[]
}
export const searchResponseState = atom<TSearchResponseState>({
  key: "searchAtom",
  default: {
    state: "idle",
    message: null,
    contents: [],
  },
})

export const textSearchState = atom<string | null>({
  key: ATOM_KEY.TEXT_SEARCH_STATE,
  default: null,
})
