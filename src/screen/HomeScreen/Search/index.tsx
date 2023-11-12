import {
  ScrollView,
  VirtualizedList,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { HomeTabScreenProps } from "../../type"
import React from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { searchAtom, textSearchAtom } from "./store"
import { useSearchPost } from "./store/hook"
import { Feather } from "@expo/vector-icons"

const mockData: { id: string; uri: string }[] = [
  {
    id: "1",
    uri: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    id: "2",
    uri: "https://i.natgeofe.com/n/87908698-fc7a-4ada-ba21-490521df2511/01-domesticated-dog_square.jpg",
  },
  {
    id: "3",
    uri: "https://d2kl333iheywy2.cloudfront.net/assets/main/lab-hero-square-1fe2f13fa943105fe2c521df43eeb11c.jpg",
  },
  {
    id: "4",
    uri: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    id: "5",
    uri: "https://i.natgeofe.com/n/87908698-fc7a-4ada-ba21-490521df2511/01-domesticated-dog_square.jpg",
  },
  {
    id: "6",
    uri: "https://d2kl333iheywy2.cloudfront.net/assets/main/lab-hero-square-1fe2f13fa943105fe2c521df43eeb11c.jpg",
  },
  {
    id: "7",
    uri: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    id: "8",
    uri: "https://i.natgeofe.com/n/87908698-fc7a-4ada-ba21-490521df2511/01-domesticated-dog_square.jpg",
  },
  {
    id: "9",
    uri: "https://d2kl333iheywy2.cloudfront.net/assets/main/lab-hero-square-1fe2f13fa943105fe2c521df43eeb11c.jpg",
  },
  {
    id: "10",
    uri: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    id: "11",
    uri: "https://i.natgeofe.com/n/87908698-fc7a-4ada-ba21-490521df2511/01-domesticated-dog_square.jpg",
  },
  {
    id: "12",
    uri: "https://d2kl333iheywy2.cloudfront.net/assets/main/lab-hero-square-1fe2f13fa943105fe2c521df43eeb11c.jpg",
  },
  {
    id: "13",
    uri: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    id: "14",
    uri: "https://i.natgeofe.com/n/87908698-fc7a-4ada-ba21-490521df2511/01-domesticated-dog_square.jpg",
  },
  {
    id: "15",
    uri: "https://d2kl333iheywy2.cloudfront.net/assets/main/lab-hero-square-1fe2f13fa943105fe2c521df43eeb11c.jpg",
  },
]
interface SearchScreenProps extends HomeTabScreenProps<"Search"> {}
interface PostListSearchProps {}
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
const PostListSearch: React.FC<PostListSearchProps> = () => {
  const search = useRecoilValue(searchAtom)
  if (search.state !== "hasValue" || !search.data) return null
  return (
    <>
      <View className="flex w-full flex-row flex-wrap justify-start">
        {search.data.map((item) => {
          return <PostItemSearch key={item.id} uri={item.image} />
        })}
      </View>
    </>
  )
}
export const SearchScreen: React.FC<SearchScreenProps> = () => {
  const [textSearch, setTextSearch] = useRecoilState(textSearchAtom)
  const { submitSearch } = useSearchPost()
  return (
    <SafeAreaView className="flex w-full gap-y-2 bg-black">
      <ScrollView showsVerticalScrollIndicator={false} className="flex bg-white px-4">
        <View className="py-4">
          <Text className="text-5xl font-light">Search</Text>
        </View>
        <View className="flex flex-row justify-between border-2 border-black p-4">
          <TextInput onChangeText={(text) => setTextSearch(text)} value={textSearch} placeholder="search" />
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
