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
import { useGetImageUpload, useImageUpload } from "./hook"
import { UploadImageComponent } from "./components"

interface UploadScreenProps extends HomeTabScreenProps<"Upload"> {}
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
