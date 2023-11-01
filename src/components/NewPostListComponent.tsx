import { View, FlatList } from "react-native"
import { NewPostItemComponent } from "./NewPostItemComponent"

type DATA = {
  uri: string
}
const data: DATA[] = [
  {
    uri: "https://images8.alphacoders.com/125/1251911.jpg",
  },
  {
    uri: "https://images8.alphacoders.com/125/1251911.jpg",
  },
  {
    uri: "https://images8.alphacoders.com/125/1251911.jpg",
  },
  {
    uri: "https://images8.alphacoders.com/125/1251911.jpg",
  },
  {
    uri: "https://images8.alphacoders.com/125/1251911.jpg",
  },
]
type NewPostListComponent = {}
export const NewPostListComponent = (props: NewPostListComponent) => {
  return (
    <View className="aspect-square w-screen">
      <FlatList
        className=""
        horizontal={true}
        data={data}
        renderItem={(item) => <NewPostItemComponent uri={item.item.uri} />}
      ></FlatList>
    </View>
  )
}
