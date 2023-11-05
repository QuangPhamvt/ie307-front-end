import React, { ReactElement } from "react"
import MasonryList from "@react-native-seoul/masonry-list"
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Touchable } from "react-native"
import { usePostList } from "../screen/HomeScreen/Main/store/customHook"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { getDataPostList, getStatePostList, postListState } from "../screen/HomeScreen/Main/store"
import { AntDesign } from "@expo/vector-icons"
interface BrowseImageItemComponentProps {
  item: { image: string; heightImage: number }
}
interface BrowseImageListComponentProps {}
interface BrowserComponentProps {}
const BrowseImageItemComponent: React.FC<Partial<BrowseImageItemComponentProps>> = (props) => {
  const { item } = props
  return (
    <Image
      className="m-1 rounded-md border-[1px] object-contain"
      height={item?.heightImage}
      source={{ uri: item?.image || "" }}
    />
  )
}
const BrowseImageListComponent: React.FC<BrowseImageListComponentProps> = () => {
  const rederItem = ({ item }: { item: any }): React.ReactElement => {
    return <BrowseImageItemComponent item={item} />
  }
  const dataPostList = useRecoilValue(getDataPostList)
  return (
    <View className="mt-4">
      <MasonryList data={dataPostList.postList} renderItem={rederItem} numColumns={2} />
    </View>
  )
}
export const BrowseComponent: React.FC<BrowserComponentProps> = (props) => {
  const {} = props
  const { handleGetPostList, handleResetPostList } = usePostList()
  const statePostList = useRecoilValue(getStatePostList)
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
        {statePostList !== "loading" ? <Text>SEE MORE</Text> : <ActivityIndicator size={"small"} />}
      </TouchableOpacity>
    </View>
  )
}
