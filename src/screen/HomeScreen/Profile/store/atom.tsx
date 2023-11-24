import { atom, selector } from "recoil"
import { STATE } from "~/src/utilities"

type TUploadAvatarState = {
  state: STATE
  message: string | null
}
type TUploadAvatarModalState = {
  state: "open" | "close"
}
export const uploadAvatarUriState = atom<string | null>({
  key: "uploadAvatarUriState",
  default: null,
})
export const uploadAvatarState = atom<TUploadAvatarState>({
  key: "uploadAvatarAtom",
  default: {
    state: "idle",
    message: null,
  },
})
export const uploadAvatarModalState = atom<TUploadAvatarModalState>({
  key: "uploadAvatarModalStateAtom",
  default: {
    state: "close",
  },
})
