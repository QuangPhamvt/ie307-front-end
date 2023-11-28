import { ScrollView, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { searchResponseState, textSearchState } from "./store"
import SearchAction from "./store/hook"
import { Feather } from "@expo/vector-icons"
import { CustomImage } from "~/src/components"
interface PostItemSearchProps {
  uri: string
}
const PostItemSearch: React.FC<PostItemSearchProps> = (props) => {
  const { uri } = props
  return (
    <View className="m-1 w-[30%]">
      <CustomImage className="w-full bg-gray-300 aspect-square" source={{ uri }} />
    </View>
  )
}
const PostListSearch: React.FC = () => {
  const { state, contents } = useRecoilValue(searchResponseState)
  if (state !== "hasValue" || !contents.length) return null
  return (
    <>
      <View className="flex flex-row flex-wrap justify-start w-full">
        {contents.map((item) => {
          return <PostItemSearch key={item.post_id} uri={item.image} />
        })}
      </View>
    </>
  )
}
export const SearchScreen: React.FC = () => {
  const [textSearch, setTextSearch] = useRecoilState(textSearchState)
  const { submitSearch } = SearchAction.useSearchPost()
  return (
    <SafeAreaView className="flex w-full bg-black gap-y-2">
      <ScrollView showsVerticalScrollIndicator={false} className="flex px-4 bg-white">
        <View className="py-4">
          <Text className="text-5xl font-light">Search</Text>
        </View>
        <View className="flex flex-row justify-between p-4 border-2 border-black">
          <TextInput
            className="w-4/5"
            onChangeText={(text) => setTextSearch(text)}
            value={textSearch || ""}
            placeholder="Search"
          />
          <TouchableOpacity className="" onPress={submitSearch}>
            <Feather name="search" size={24} />
          </TouchableOpacity>
        </View>
        <View className="my-2">
          <Text className="font-bold">ALL RESULTS</Text>
        </View>
        <PostListSearch />
      </ScrollView>
    </SafeAreaView>
  )
}
