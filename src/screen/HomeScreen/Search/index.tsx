import { ScrollView, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { searchResponseState, textSearchState } from "./store"
import SearchAction from "./store/hook"
import { Feather } from "@expo/vector-icons"
interface PostItemSearchProps {
  uri: string
}
const PostItemSearch: React.FC<PostItemSearchProps> = (props) => {
  const { uri } = props
  return (
    <View className="m-1 w-[30%]">
      <Image className="aspect-square w-full" source={{ uri }} />
    </View>
  )
}
const PostListSearch: React.FC = () => {
  const { state, contents } = useRecoilValue(searchResponseState)
  if (state !== "hasValue" || !contents.length) return null
  return (
    <>
      <View className="flex w-full flex-row flex-wrap justify-start">
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
    <SafeAreaView className="flex w-full gap-y-2 bg-black">
      <ScrollView showsVerticalScrollIndicator={false} className="flex bg-white px-4">
        <View className="py-4">
          <Text className="text-5xl font-light">Search</Text>
        </View>
        <View className="flex flex-row justify-between border-2 border-black p-4">
          <TextInput onChangeText={(text) => setTextSearch(text)} value={textSearch || ""} placeholder="search" />
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
