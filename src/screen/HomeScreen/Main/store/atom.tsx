import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"

export type TPostItem = {
  id: string
  image: string
  heightImage: number
}
export type TPostListState = {
  state: STATE
  message: string | null
  contents: {
    postList: TPostItem[]
    limit: number
    nextPage: number
  }
}
export const postListState = atom<TPostListState>({
  key: ATOM_KEY.GET_POST_LIST,
  default: {
    state: "idle",
    message: null,
    contents: {
      postList: [],
      limit: 5,
      nextPage: 1,
    },
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.debug("Curren next page: ", newValue.contents.nextPage)
      })
    },
  ],
})
