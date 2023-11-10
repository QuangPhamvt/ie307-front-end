import { selector } from "recoil"
import { authState } from "../../../../recoil/atom"
type TProfileSelect = {
  username: string
  avatar: string
}
export const profileSelect = selector<{ username: string; avatar: string }>({
  key: "profileSelect",
  get: ({ get }) => {
    const {
      data: { username = "", avatar = "" },
    } = get(authState)
    return { username, avatar }
  },
})
