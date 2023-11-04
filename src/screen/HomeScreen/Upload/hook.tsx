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
      console.log(result.assets[0].uri)
      saveImage(result.assets[0].uri)
    }
  }, [])
  return { image, selectImage }
}
export const useImageUpload = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const handleUpload = React.useCallback(async (title: string, uri: string) => {
    try {
      setIsLoading(true)
      const data = await fetch(uri).then((res) => res.blob())
      // const file = new File([blob], {
      //   uri: uri,
      //   type: "image/jpeg",
      //   name: "test.jpg",
      // })

      // const data = await response
      // console.log("data: ", data)
      const metadata = {
        type: data.type,
      }
      // const file = new File([data], "test.jpg", { ...metadata, lastModified: new Date().getTime() })
      const file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
      const test = "data:image/jpeg;base64," + file
      console.log(test)

      if (uri && data) await postApi.uploadPost({ title, image: test })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])
  return { isLoading, handleUpload }
}
