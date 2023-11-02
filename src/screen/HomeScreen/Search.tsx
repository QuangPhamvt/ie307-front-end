import { ScrollView, VirtualizedList, View, Text, SafeAreaView, TextInput, Image, FlatList } from "react-native"
import { HomeTabScreenProps } from "../type"
import React from "react"

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
    <View className="m-2 mx-auto aspect-square w-[30%] border-[1px]">
      <Image className="h-full w-full" source={{ uri }} />
    </View>
  )
}
const PostListSearch: React.FC<PostListSearchProps> = () => {
  return (
    <FlatList
      scrollEnabled={true}
      alwaysBounceVertical
      data={mockData}
      numColumns={3}
      renderItem={({ item }) => <PostItemSearch uri={item.uri} />}
      keyExtractor={(item) => item.id}
    />
  )
}
export const SearchScreen: React.FC<SearchScreenProps> = () => {
  return (
    <SafeAreaView className="flex w-full gap-y-2 bg-black">
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white px-4">
        <View className="py-4">
          <Text className="text-5xl font-light">Search</Text>
        </View>
        <TextInput className="border-2 border-black p-4" placeholder="search" />
        <View className="my-2">
          <Text className="font-bold">ALL RESULTS</Text>
        </View>
        <PostListSearch />
      </ScrollView>
    </SafeAreaView>
  )
}
