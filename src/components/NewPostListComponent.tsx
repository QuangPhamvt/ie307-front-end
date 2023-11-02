import { View, FlatList } from "react-native"
import { NewPostItemComponent } from "./NewPostItemComponent"
import { HomeTabScreenProps } from "../screen/type"

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
interface NewPostListComponentProps extends HomeTabScreenProps<"Main"> {}
export const NewPostListComponent = (props: Partial<NewPostListComponentProps>) => {
  const {} = props
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
