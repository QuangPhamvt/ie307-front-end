import React from "react"
import { ScrollView, View, Text, SafeAreaView } from "react-native"
import { BrowseComponent, NewPostListComponent } from "../../../components"
import { HomeTabScreenProps } from "../../type"

interface MainScreenProps extends HomeTabScreenProps<"Main"> {}
interface HeaderMainComponentProps extends HomeTabScreenProps<"Main"> {}
const HeaderMainComponent: React.FC<Partial<HeaderMainComponentProps>> = (props) => {
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
export const MainScreen: React.FC<MainScreenProps> = (props) => {
  const {} = props
  return (
    <SafeAreaView className="bg-black">
      <ScrollView className="bg-white">
        <View className="mx-4 mt-4">
          <Text className="text-5xl font-light">Discover</Text>
        </View>
        <HeaderMainComponent />
        <BrowseComponent />
      </ScrollView>
    </SafeAreaView>
  )
}
