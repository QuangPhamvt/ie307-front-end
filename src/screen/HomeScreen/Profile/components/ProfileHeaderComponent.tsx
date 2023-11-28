import { useSetRecoilState, useRecoilValue } from "recoil"
import { View, ImageBackground, Image, TouchableOpacity } from "react-native"
import React from "react"
import { EvilIcons } from "@expo/vector-icons"
import { authState } from "~/src/recoil/atom"
import { uploadAvatarModalState } from "../store"

export const ProfileHeaderComponent: React.FC = () => {
  const { contents } = useRecoilValue(authState)
  const setUploadAvatarModal = useSetRecoilState(uploadAvatarModalState)
  return (
    <View className="relative h-32 w-32 rounded-full border-[1px] border-solid border-gray-600 bg-gray-400">
      <Image
        className="w-full h-full rounded-full"
        source={{
          uri: contents.avatar || "",
        }}
      />
      <TouchableOpacity onPress={() => setUploadAvatarModal({ state: "open" })}>
        <View className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 border-2 border-gray-500 rounded-full">
          <EvilIcons name="camera" size={28} />
        </View>
      </TouchableOpacity>
    </View>
  )
}
