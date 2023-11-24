import React, { useEffect } from "react"
import { RootNativeStackParamList, RootNativeStackScreenProps } from "../type"
import { ImageBackground, Image, SafeAreaView, Text, View, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { AvatarOriginPostComponent } from "./components"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import StoryAction from "./store/hook"
import { originPostState } from "./store"

const StoryScreen: React.FC = () => {
  const {
    params: { postId },
  } = useRoute<RouteProp<RootNativeStackParamList, "Story">>()
  const { state, contents } = useRecoilValue(originPostState)
  const resetOriginPostState = useResetRecoilState(originPostState)
  const { getOriginPost } = StoryAction.useGetOriginPost()
  const navigation = useNavigation()
  useEffect(() => {
    getOriginPost(postId)
  }, [postId])

  return (
    <SafeAreaView className="bg-black">
      {state === "hasValue" && !!contents.image && (
        <ImageBackground
          resizeMode="cover"
          className="opacity-70"
          source={{
            uri: `${contents.image}`,
          }}
        >
          <View className="h-screen w-screen ">
            <TouchableOpacity onPress={() => navigation.navigate("User", { userId: contents.author?.author_id || "" })}>
              <View className="flex flex-row items-center justify-between opacity-90">
                <AvatarOriginPostComponent
                  title={contents.title || ""}
                  authorAvatar={contents.author?.avatar || ""}
                  authorUsername={contents.author?.username || ""}
                />
                <View
                  className="mr-4"
                  onTouchStart={() => {
                    resetOriginPostState()
                    navigation?.navigate("Home", { screen: "Main" })
                  }}
                >
                  <AntDesign color={"#ccc"} name="close" size={32} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  )
}
export default StoryScreen
