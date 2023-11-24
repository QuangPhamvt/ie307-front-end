import { Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import { View, TouchableOpacity, Image, Alert } from "react-native"
import { useDoubleTap } from "~/src/hooks"
import UploadAction from "../store/hook"
import React from "react"
import { useRecoilValue } from "recoil"
import { imageUploadPayloadState, imageUploadResponseState } from "../store/atom"
export const UploadImageComponent: React.FC = () => {
  const {
    state,
    contents: { uri },
  } = useRecoilValue(imageUploadPayloadState)
  const { state: stateResponse } = useRecoilValue(imageUploadResponseState)
  const { handleSetImageUploadPayloadState } = UploadAction.useGetImageUpload()
  React.useEffect(() => {
    buttonAlert()
  }, [])

  const buttonAlert = () =>
    Alert.alert("Upload", "Choose an upload method", [
      {
        text: "Library",
        onPress: () => handleSetImageUploadPayloadState(true),
      },
      {
        text: "Camera",
        onPress: () => handleSetImageUploadPayloadState(false),
      },
    ])
  const { handleDoubleTap } = useDoubleTap(buttonAlert, 500)

  return (
    <>
      <View className="mt-12 flex aspect-square h-1/2 items-center justify-center rounded-md border-2 border-gray-600 ">
        <TouchableOpacity
          className="flex h-full w-full items-center justify-center"
          onPress={() => {
            handleDoubleTap()
          }}
        >
          {state === "hasValue" && <Image source={{ uri: uri || "" }} className="h-full w-full rounded-md" />}
          {state === "idle" && stateResponse === "hasValue" && <Ionicons name="checkmark-sharp" size={42} />}
          {state === "idle" && stateResponse === "idle" && <SimpleLineIcons name="cloud-upload" size={42} />}
        </TouchableOpacity>
      </View>
    </>
  )
}
