import { useRecoilValue } from "recoil"
import { postListState } from "../store"
import { BrowseImageItemComponent } from "./BrowseImageItemComponent"
import { View } from "react-native"
import MasonryList from "@react-native-seoul/masonry-list"

const RenderItem = ({ item }: { item: any }): React.ReactElement<{}> => {
  return <BrowseImageItemComponent item={item} />
}
export const BrowseImageListComponent: React.FC = () => {
  const {
    contents: { postList },
  } = useRecoilValue(postListState)

  return (
    <View className="mt-4">
      <MasonryList data={postList} renderItem={RenderItem} numColumns={2} />
    </View>
  )
}
