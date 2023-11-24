import React from "react"
import { Alert, SafeAreaView, Text, TouchableOpacity, View, TextInput, ActivityIndicator, Keyboard } from "react-native"
import UploadAction from "./store/hook"
import { UploadImageComponent } from "./components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { imageUploadPayloadState, imageUploadResponseState } from "./store/atom"

export const UploadScreen: React.FC = () => {
  const setImageUploadPayloadState = useSetRecoilState(imageUploadPayloadState)
  const { state } = useRecoilValue(imageUploadResponseState)
  const { handleImageUpload } = UploadAction.useImageUpload()

  return (
    <SafeAreaView className="h-screen w-screen bg-black">
      <View className="flex h-full w-full items-center bg-white p-4" onTouchStart={() => Keyboard.dismiss()}>
        <UploadImageComponent />
        <View className="mt-8 flex w-full items-center">
          <TextInput
            className="w-3/4 rounded-lg border-2 border-black p-2 text-center"
            placeholder="Title "
            onChangeText={(text) =>
              setImageUploadPayloadState((preState) => ({
                ...preState,
                contents: {
                  ...preState.contents,
                  title: text,
                },
              }))
            }
          />
          <TouchableOpacity className="mt-4 w-3/4 rounded-md border-2 border-black p-4" onPress={handleImageUpload}>
            {state === "isLoading" ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <Text className="text-center text-2xl font-bold">Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
