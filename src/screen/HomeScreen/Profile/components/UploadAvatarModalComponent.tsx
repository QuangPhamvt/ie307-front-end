import React from "react"
import { Modal, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native"
import { useRecoilState, useRecoilValue } from "recoil"
import { uploadAvatarAtom, uploadAvatarModalAtom, useAvatarUpload, useGetAvatarUpload } from "../store"
import { useDoubleTap } from "~/src/hooks"

export const UploadAvatarModalComponent = () => {
  const [uploadAvatarModal, setUploadAvatarModal] = useRecoilState(uploadAvatarModalAtom)
  const uploadAvatar = useRecoilValue(uploadAvatarAtom)
  const { avatar, selectAvatar } = useGetAvatarUpload()
  const alertSelect = React.useCallback(
    () =>
      Alert.alert("Upload Avatar", "Choose an upload method", [
        {
          text: "Library",
          onPress: () => selectAvatar(true),
        },
        {
          text: "Camera",
          onPress: () => selectAvatar(false),
        },
      ]),
    [],
  )
  const { handleDoubleTap } = useDoubleTap(alertSelect, 500)
  const { handleUpload } = useAvatarUpload()

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
              <TouchableOpacity onPress={() => handleUpload(avatar)}>
                {uploadAvatar.state === "loading" ? <ActivityIndicator /> : <Text className="text-white">Ok</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
