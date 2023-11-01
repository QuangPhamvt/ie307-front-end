import { SafeAreaView, Text, View } from "react-native"
import { HomeTabScreenProps } from "../type"

interface UploadScreenProps extends HomeTabScreenProps<"Upload"> {}
export const UploadScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Upload Screen</Text>
      </View>
    </SafeAreaView>
  )
}
