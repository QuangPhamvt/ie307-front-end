import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"

export const MessageScreenHeader = () => {
  const navigator = useNavigation()
  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-start space-x-4 p-4">
        <TouchableOpacity>
          <Entypo name="chevron-left" size={24} />
        </TouchableOpacity>
        <View className="">
          <Text className="text-lg font-bold">CustomAFK</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}