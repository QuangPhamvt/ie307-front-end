import React from "react"
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useRecoilValue } from "recoil"
import { AntDesign } from "@expo/vector-icons"
import { postListState } from "~/src/screen/HomeScreen/Main/store"
import PostAction from "../store/customHook"
import { BrowseImageListComponent } from "./BrowseImageListComponent"

export const BrowseComponent: React.FC = () => {
  const { handleGetPostList } = PostAction.useGetPostList()
  const { handleResetPostList } = PostAction.useResetPostList()
  const { state } = useRecoilValue(postListState)
  return (
    <View className="mx-4 mt-8">
      <TouchableOpacity onPress={handleResetPostList}>
        <View className="ml-2 flex flex-row items-center space-x-2">
          <AntDesign name="reload1" size={16} />
          <Text className="font-bold">Browser All</Text>
        </View>
      </TouchableOpacity>
      <BrowseImageListComponent />
      <TouchableOpacity
        onPress={handleGetPostList}
        className="mt-2 w-full items-center rounded-lg border-2 border-black p-4"
      >
        {state !== "isLoading" ? <Text>SEE MORE</Text> : <ActivityIndicator size={"small"} />}
      </TouchableOpacity>
    </View>
  )
}
