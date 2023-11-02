import React from "react"
import { RootNativeStackScreenProps } from "./type"
import { ImageBackground, Image, SafeAreaView, Text, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"

interface StoryScreenProps extends RootNativeStackScreenProps<"Story"> {}
const StoryScreen: React.FC<StoryScreenProps> = (props) => {
  const { navigation } = props
  return (
    <SafeAreaView className="bg-black">
      <ImageBackground
        resizeMode="cover"
        className="opacity-70"
        source={{
          uri: "https://mcdn.wallpapersafari.com/medium/4/9/0MGByT.jpg",
        }}
      >
        <View className="h-screen w-screen ">
          <View className="flex flex-row items-center justify-between opacity-90">
            <View className="flex flex-row items-center gap-x-2 p-4">
              <Image
                className="h-10 w-10 rounded-full"
                source={{
                  uri: "https://images8.alphacoders.com/125/1251911.jpg",
                }}
              />
              <View className="">
                <Text className="text-base font-bold leading-4 text-white">CustomAFK</Text>
                <Text className="text-sm leading-3 text-[#ccc]">@quangpm</Text>
              </View>
            </View>
            <View className="mr-4" onTouchStart={() => navigation?.navigate("Home", { screen: "Main" })}>
              <AntDesign color={"#ccc"} name="close" size={32} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
export default StoryScreen
