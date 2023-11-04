import { atom } from "recoil"

export const imageUploadState = atom<string>({
  key: "ImageUpload",
  default: "",
})
