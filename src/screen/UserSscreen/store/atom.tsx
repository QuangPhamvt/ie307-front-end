import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"
type TOriginUserState = {
  state: STATE
  message: string | null
  contents: {
    user: {
      user_id: string | null
      username: string | null
      avatar: string | null
    } | null
    isFollowing: boolean | null
    postList: {
      post_id: string
      image: string
    }[]
  }
}
export const originUserState = atom<TOriginUserState>({
  key: ATOM_KEY.ORIGIN_USER_STATE,
  default: {
    state: "idle",
    message: null,
    contents: {
      user: null,
      isFollowing: null,
      postList: [],
    },
  },
  effects: [
    ({ onSet }) => {
      onSet((newUser) => {
        if (newUser.contents.user) {
          const { user_id, username } = newUser.contents.user
          console.debug("Current Origin User: ", user_id, username)
        }
      })
    },
  ],
})
