import { View, Text, ScrollView } from "react-native"
import { HomeTabScreenProps } from "~/src/screen/type"
import { NewPostListComponent } from "./NewPostListComponent"
interface HeaderMainComponentProps extends HomeTabScreenProps<"Main"> {}
export const HeaderMainComponent: React.FC<Partial<HeaderMainComponentProps>> = (props) => {
  const {} = props
  return (
    <View>
      <View className="m-4 flex">
        <Text className="text-xs font-bold">WHAT'S NEW TODAY</Text>
      </View>
      <ScrollView className="" alwaysBounceHorizontal>
        <NewPostListComponent />
      </ScrollView>
    </View>
  )
}
