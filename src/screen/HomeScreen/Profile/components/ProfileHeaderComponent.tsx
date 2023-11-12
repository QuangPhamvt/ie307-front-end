import { useSetRecoilState, useRecoilValue } from "recoil"
import { profileSelect, uploadAvatarModalAtom } from "../store"
import { View, ImageBackground, Image, TouchableOpacity } from "react-native"
import React from "react"
import { EvilIcons } from "@expo/vector-icons"

export const ProfileHeaderComponent: React.FC = () => {
  const profile = useRecoilValue(profileSelect)
  const setUploadAvatarModal = useSetRecoilState(uploadAvatarModalAtom)
  return (
    <View className="relative h-32 w-32 rounded-full bg-gray-400">
      <ImageBackground borderRadius={9999} resizeMode="cover" source={require("../../../../../assets/avatar.png")}>
        <Image
          className="h-full w-full rounded-full"
          source={{
            uri: profile.avatar || "",
          }}
        />
        <TouchableOpacity onPress={() => setUploadAvatarModal({ state: "open" })}>
          <View className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-500">
            <EvilIcons name="camera" size={28} />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}
