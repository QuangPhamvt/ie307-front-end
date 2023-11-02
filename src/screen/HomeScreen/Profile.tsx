import React from "react"
import { HomeTabScreenProps, RootNativeStackScreenProps } from "../type"
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}
interface HeaderProfileComponentProps extends HomeTabScreenProps<"Profile"> {}
export const HeaderProfileComponent = () => {
  return (
    <View className="flex w-full items-center justify-center gap-y-4 pt-8">
      <View className="flex items-center justify-center">
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: "https://images8.alphacoders.com/125/1251911.jpg",
          }}
        />
        <View className="mt-6 flex items-center justify-center">
          <Text className="text-3xl font-bold">Jane</Text>
          <Text className="mt-2">SAN FRANCISCO, CA</Text>
        </View>
      </View>
      <View className="flex w-full gap-y-2">
        <TouchableOpacity className="w-full rounded-lg bg-black p-4 ">
          <Text className="text-center text-xl font-bold text-white">FOLLOW ME</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-full rounded-lg border-2 border-black bg-white p-3">
          <Text className="text-center text-xl font-bold text-black">MESSAGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const { navigation } = props
  return (
    <SafeAreaView className="bg-black">
      <ScrollView className="h-full w-full bg-white p-4">
        <HeaderProfileComponent />
      </ScrollView>
    </SafeAreaView>
  )
}
