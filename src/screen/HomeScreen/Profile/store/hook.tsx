import React from "react"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { authApi, postApi } from "~/src/api"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { uploadAvatarModalState, uploadAvatarState, uploadAvatarUriState } from "./atom"
import { authState } from "~/src/recoil/atom"

const imageDirectory = FileSystem.documentDirectory + "IE307/"
const ensureDirectoryExits = async () => {
  const directoryInfo = await FileSystem.getInfoAsync(imageDirectory)
  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(imageDirectory, { intermediates: true })
  }
}
const useGetAvatarUpload = () => {
  const setUploadAvatarUriState = useSetRecoilState(uploadAvatarUriState)
  const saveAvatar = async (uri: string) => {
    await ensureDirectoryExits()
    const fileName = new Date().getTime() + ".jpg"
    const destination = imageDirectory + fileName
    await FileSystem.copyAsync({ from: uri, to: destination })
    setUploadAvatarUriState(destination)
  }
  const handleSelectAvatar = async (useLibrary: boolean) => {
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
  }
  return { handleSelectAvatar }
}

const useAvatarUpload = () => {
  const setUploadAvatarState = useSetRecoilState(uploadAvatarState)
  const setAuth = useSetRecoilState(authState)
  const setUploadAvatarModalState = useSetRecoilState(uploadAvatarModalState)
  const uri = useRecoilValue(uploadAvatarUriState)
  const handleUpload = async () => {
    try {
      if (!uri) throw { data: { message: "Some Thing wrong" } }
      setUploadAvatarState({ state: "isLoading", message: null })
      const base64String = await FileSystem.readAsStringAsync(uri, { encoding: "base64", length: 9999999 })
      const image = "data:image/jpeg;base64," + base64String
      const {
        data: { message },
      } = await authApi.postUploadAvatar({ avatar: image })

      setAuth((preState) => ({ ...preState, contents: { ...preState.contents, avatar: image } }))

      setUploadAvatarModalState({ state: "close" })
      setUploadAvatarState({ state: "hasValue", message })
    } catch (error: any) {
      console.log(error.data)
      setUploadAvatarState({ state: "hasError", message: error.data.message })
    }
  }
  return { handleUpload }
}

const ProfileAction = {
  useAvatarUpload,
  useGetAvatarUpload,
}

export default ProfileAction
