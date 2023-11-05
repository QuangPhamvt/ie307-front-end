import React from "react"
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native"
import { HomeTabScreenProps } from "../../type"
import * as ImagePicker from "expo-image-picker"
import { useGetImageUpload, useImageUpload } from "./hook"
import { useDoubleTap } from "../../../hooks"
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons"

interface UploadScreenProps extends HomeTabScreenProps<"Upload"> {}

const imagePicker = async (library: boolean) => {
  if (library) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 1],
      quality: 0.5,
    })
    console.log(result)
    if (!result.canceled) return result.assets[0].uri
  }
}
const UploadImageComponent: React.FC<{
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
export const UploadScreen: React.FC = () => {
  const { image, selectImage } = useGetImageUpload()
  const [title, setTitle] = React.useState<string>("")
  const { updateState, setUpadeState, handleUpload } = useImageUpload()
  const buttonAlert = React.useCallback(
    () =>
      Alert.alert("Upload", "Choose an upload method", [
        {
          text: "Library",
          onPress: () => selectImage(true),
        },
        {
          text: "Camera",
          onPress: () => selectImage(false),
        },
      ]),
    [],
  )
  React.useEffect(() => {
    buttonAlert()
  }, [])

  return (
    <SafeAreaView className="h-screen w-screen bg-black">
      <View className="flex h-full w-full items-center bg-white p-4" onTouchStart={() => Keyboard.dismiss()}>
        <UploadImageComponent
          onSetUpdateState={setUpadeState}
          updateState={updateState}
          onSetUploadImage={buttonAlert}
          imageUri={image}
        />
        <View className="mt-8 flex w-full items-center">
          <TextInput
            className="w-3/4 rounded-lg border-2 border-black p-2 text-center"
            placeholder="Title "
            onChangeText={(text) => setTitle(text)}
          />
          <TouchableOpacity
            className="mt-4 w-3/4 rounded-md border-2 border-black p-4"
            onPress={() => handleUpload(title, image)}
          >
            {updateState === "updating" ? (
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
