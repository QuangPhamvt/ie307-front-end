import { atom, selector } from "recoil"
import { authState } from "~/src/recoil/atom"
type TProfileSelect = {
  username: string
  avatar: string
}
type TUploadAvatarAtom = {
  state: "idle" | "success" | "loading" | "hasError"
}
type TUploadAvatarModalAtom = {
  state: "open" | "close"
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
export const uploadAvatarAtom = atom<TUploadAvatarAtom>({
  key: "uploadAvatarAtom",
  default: {
    state: "idle",
  },
})
export const uploadAvatarModalAtom = atom<TUploadAvatarModalAtom>({
  key: "uploadAvatarModalAtom",
  default: {
    state: "close",
  },
})
