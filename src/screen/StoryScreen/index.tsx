import React, { useEffect } from "react"
import { RootNativeStackParamList, RootNativeStackScreenProps } from "../type"
import { ImageBackground, Image, SafeAreaView, Text, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { AvatarOriginPostComponent } from "./components"
import { useRecoilValue } from "recoil"
import { originPostAtom, useGetOriginPost } from "./store"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

interface StoryScreenProps extends RootNativeStackScreenProps<"Story"> {}
const StoryScreen: React.FC<StoryScreenProps> = (props) => {
  const originPost = useRecoilValue(originPostAtom)
  const route = useRoute<RouteProp<RootNativeStackParamList, "Story">>()
  const { getOriginPost } = useGetOriginPost(route.params.postId)
  const navigation = useNavigation()
  useEffect(() => {
    getOriginPost()
  }, [])
  return (
    <SafeAreaView className="bg-black">
      {originPost.state === "hasValue" && !!originPost.data && (
        <ImageBackground
          resizeMode="cover"
          className="opacity-70"
          source={{
            uri: `${originPost.data.image}`,
          }}
        >
          <View className="h-screen w-screen ">
            <View className="flex flex-row items-center justify-between opacity-90">
              <AvatarOriginPostComponent
                title={originPost.data.title}
                authorAvatar={originPost.data.authorAvatar}
                authorUsername={originPost.data.authorUsername}
              />
              <View className="mr-4" onTouchStart={() => navigation?.navigate("Home", { screen: "Main" })}>
                <AntDesign color={"#ccc"} name="close" size={32} />
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  )
}
export default StoryScreen
