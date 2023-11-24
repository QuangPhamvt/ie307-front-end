import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"

type TImageUploadPayloadState = {
  state: STATE
  contents: {
    title: string | null
    uri: string | null
  }
}
type TImageUploadResponseState = {
  state: STATE
  contents: {
    message: string | null
  }
}
export const imageUploadPayloadState = atom<TImageUploadPayloadState>({
  key: ATOM_KEY.IMAGE_UPLOAD_URI_STATE,
  default: {
    state: "idle",
    contents: {
      title: null,
      uri: null,
    },
  },
})
export const imageUploadResponseState = atom<TImageUploadResponseState>({
  key: ATOM_KEY.IMAGE_UPLOAD_STATE,
  default: {
    state: "idle",
    contents: {
      message: null,
    },
  },
})
