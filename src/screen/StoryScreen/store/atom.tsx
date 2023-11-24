import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"
type TOriginPostState = {
  state: STATE
  message: null
  contents: {
    post_id: string | null
    title: string | null
    image: string | null
    author: {
      author_id: string
      username: string
      avatar: string | null
    } | null
  }
}
export const originPostState = atom<TOriginPostState>({
  key: ATOM_KEY.GET_ORIGIN_POST,
  default: {
    state: "idle",
    message: null,
    contents: {
      post_id: null,
      title: null,
      image: null,
      author: null,
    },
  },
})
