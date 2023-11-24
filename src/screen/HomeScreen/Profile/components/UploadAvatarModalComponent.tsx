import React from "react"
import { Modal, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native"
import { useRecoilState, useRecoilValue } from "recoil"
import { useDoubleTap } from "~/src/hooks"
import { ProfileAction, uploadAvatarModalState, uploadAvatarState, uploadAvatarUriState } from "../store"
import { authState } from "~/src/recoil/atom"

export const UploadAvatarModalComponent = () => {
  const [uploadAvatarModal, setUploadAvatarModal] = useRecoilState(uploadAvatarModalState)
  const avatar = useRecoilValue(uploadAvatarUriState)
  const { state, message } = useRecoilValue(uploadAvatarState)
  const { handleSelectAvatar } = ProfileAction.useGetAvatarUpload()
  const alertSelect = () =>
    Alert.alert("Upload Avatar", "Choose an upload method", [
      {
        text: "Library",
        onPress: () => handleSelectAvatar(true),
      },
      {
        text: "Camera",
        onPress: () => handleSelectAvatar(false),
      },
    ])
  const { handleDoubleTap } = useDoubleTap(alertSelect, 500)
  const { handleUpload } = ProfileAction.useAvatarUpload()

  return (
    <Modal className="" transparent={true} visible={uploadAvatarModal.state === "open"} animationType="fade">
      <View className="flex h-full w-full items-center justify-center bg-black/60">
        <View className="flex h-56 w-64 items-center space-y-4 rounded-lg bg-white p-4">
          <TouchableOpacity onPress={handleDoubleTap}>
            <View className="h-36 w-36 rounded-full border-2 border-gray-400 bg-white">
              {avatar && <Image className="h-full w-full rounded-full" source={{ uri: avatar }} />}
            </View>
          </TouchableOpacity>
          <View className="flex w-full flex-row justify-around">
            <View className="flex w-5/12 items-center justify-center rounded-md border-2 border-black px-4 py-1">
              <TouchableOpacity onPress={() => setUploadAvatarModal({ state: "close" })}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View className="flex w-5/12 items-center justify-center rounded-md border-2 border-black bg-black px-4 py-1">
              <TouchableOpacity onPress={() => handleUpload()}>
                {state === "isLoading" ? <ActivityIndicator /> : <Text className="text-white">Ok</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
