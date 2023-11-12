import React from "react"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { authApi, postApi } from "~/src/api"
import { useSetRecoilState } from "recoil"
import { uploadAvatarAtom, uploadAvatarModalAtom } from "./atom"
import { authState } from "~/src/recoil/atom"

const imageDirectory = FileSystem.documentDirectory + "IE307/"
const ensureDirectoryExits = async () => {
  const directoryInfo = await FileSystem.getInfoAsync(imageDirectory)
  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(imageDirectory, { intermediates: true })
  }
}
export const useGetAvatarUpload = () => {
  const [avatar, setAvatar] = React.useState<string>("")
  const saveAvatar = React.useCallback(async (uri: string) => {
    await ensureDirectoryExits()
    const fileName = new Date().getTime() + ".jpg"
    const destination = imageDirectory + fileName
    await FileSystem.copyAsync({ from: uri, to: destination })
    setAvatar(destination)
  }, [])
  const selectAvatar = React.useCallback(async (useLibrary: boolean) => {
    let result
    const option: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 0.75,
    }
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(option)
    } else {
      await ImagePicker.requestCameraPermissionsAsync()
      result = await ImagePicker.launchCameraAsync(option)
    }
    if (!result.canceled) {
      saveAvatar(result.assets[0].uri)
    }
  }, [])
  return { avatar, selectAvatar }
}
export const useAvatarUpload = () => {
  const setUploadAvatar = useSetRecoilState(uploadAvatarAtom)
  const setAuth = useSetRecoilState(authState)
  const setUploadAvatarModal = useSetRecoilState(uploadAvatarModalAtom)
  const handleUpload = React.useCallback(async (uri: string) => {
    try {
      setUploadAvatar({ state: "loading" })
      const base64String = await FileSystem.readAsStringAsync(uri, { encoding: "base64", length: 9999999 })
      const image = "data:image/jpeg;base64," + base64String

      if (uri && image) await authApi.postUploadAvatar(image)
      setAuth((preState) => ({ ...preState, data: { ...preState.data, avatar: image } }))
      setUploadAvatarModal({ state: "close" })
      setUploadAvatar({ state: "success" })
    } catch (error) {
      console.log(error)
      setUploadAvatar({ state: "hasError" })
    }
  }, [])
  return { handleUpload }
}
