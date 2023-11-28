import React, { useEffect } from "react"
import { RootNativeStackParamList, RootNativeStackScreenProps } from "../type"
import { ImageBackground, Image, SafeAreaView, Text, View, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { AvatarOriginPostComponent } from "./components"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import StoryAction from "./store/hook"
import { originPostState } from "./store"
import { authState } from "~/src/recoil/atom"

const StoryScreen: React.FC = () => {
  const {
    params: { postId },
  } = useRoute<RouteProp<RootNativeStackParamList, "Story">>()
  const { state, contents } = useRecoilValue(originPostState)
  const resetOriginPostState = useResetRecoilState(originPostState)
  const { getOriginPost } = StoryAction.useGetOriginPost()
  const navigation = useNavigation()
  const {
    contents: { id },
  } = useRecoilValue(authState)
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
          <View className="w-screen h-screen ">
            <TouchableOpacity
              onPress={() => {
                if (contents.author?.author_id === id) navigation.navigate("Home", { screen: "Profile" })
                if (contents.author?.author_id !== id)
                  navigation.navigate("User", { userId: contents.author?.author_id || "" })
              }}
            >
              <View className="flex flex-row items-center justify-between shadow-xl">
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
