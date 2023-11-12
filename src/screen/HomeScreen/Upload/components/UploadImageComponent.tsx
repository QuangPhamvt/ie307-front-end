import { Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import { View, TouchableOpacity, Image } from "react-native"
import { useDoubleTap } from "~/src/hooks"
export const UploadImageComponent: React.FC<{
  imageUri: string
  onSetUploadImage: () => void
  updateState: "idle" | "updating" | "success"
  onSetUpdateState: (state: "idle" | "success" | "updating") => void
}> = (props) => {
  const { imageUri, onSetUploadImage, updateState, onSetUpdateState } = props
  const { handleDoubleTap } = useDoubleTap(onSetUploadImage, 500)
  return (
    <>
      <View className="mt-12 flex aspect-square h-1/2 items-center justify-center rounded-md border-2 border-gray-600 ">
        <TouchableOpacity
          className="flex h-full w-full items-center justify-center"
          onPress={() => {
            onSetUpdateState("idle")
            handleDoubleTap()
          }}
        >
          {imageUri && updateState === "idle" && (
            <Image source={{ uri: imageUri }} className="h-full w-full rounded-md" />
          )}
          {imageUri && updateState === "success" && <Ionicons name="checkmark-sharp" size={42} />}
          {!imageUri && <SimpleLineIcons name="cloud-upload" size={42} />}
        </TouchableOpacity>
      </View>
    </>
  )
}
