import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, Image } from "react-native"
import { CustomImage } from "~/src/components"

interface BrowseImageItemComponentProps {
  item: { id: string; image: string; heightImage: number }
}
export const BrowseImageItemComponent: React.FC<Partial<BrowseImageItemComponentProps>> = (props) => {
  const { item } = props
  if (!item) return null
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Story", { postId: item.id })}>
      <CustomImage
        className="m-1 rounded-md border-[1px] bg-slate-300 object-contain"
        height={item?.heightImage}
        source={{ uri: item?.image || "" }}
      />
    </TouchableOpacity>
  )
}
