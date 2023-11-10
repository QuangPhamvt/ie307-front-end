import React from "react"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { postApi } from "../../../api"
import axios from "axios"

const imageDirectory = FileSystem.documentDirectory + "IE307/"
const ensureDirectoryExits = async () => {
  const directoryInfo = await FileSystem.getInfoAsync(imageDirectory)
  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(imageDirectory, { intermediates: true })
  }
}
export const useGetImageUpload = () => {
  const [image, setImage] = React.useState<string>("")
  const saveImage = React.useCallback(async (uri: string) => {
    await ensureDirectoryExits()
    const fileName = new Date().getTime() + ".jpg"
    const destination = imageDirectory + fileName
    await FileSystem.copyAsync({ from: uri, to: destination })
    setImage(destination)
  }, [])
  const selectImage = React.useCallback(async (useLibrary: boolean) => {
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
      // console.log(result.assets[0].uri)
      saveImage(result.assets[0].uri)
    }
  }, [])
  return { image, selectImage }
}
export const useImageUpload = () => {
  const [updateState, setUpadeState] = React.useState<"idle" | "updating" | "success">("idle")
  const handleUpload = React.useCallback(async (title: string, uri: string) => {
    try {
      setUpadeState("updating")
      const base64String = await FileSystem.readAsStringAsync(uri, { encoding: "base64", length: 9999999 })
      // console.log(base64String)
      const image = "data:image/jpeg;base64," + base64String

      if (uri && image) await postApi.uploadPost({ title, image })
      setUpadeState("success")
    } catch (error) {
      console.log(error)
    }
  }, [])
  return { updateState, setUpadeState, handleUpload }
}
