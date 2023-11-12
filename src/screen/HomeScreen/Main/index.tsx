import React from "react"
import { ScrollView, View, Text, SafeAreaView } from "react-native"
import { BrowseComponent } from "./components"
import { HomeTabScreenProps } from "../../type"
import { usePostList } from "./store/customHook"
import { HeaderMainComponent } from "./components"

interface MainScreenProps extends HomeTabScreenProps<"Main"> {}
export const MainScreen: React.FC<MainScreenProps> = (props) => {
  const {} = props
  const { handleGetPostList } = usePostList()
  React.useEffect(() => {
    handleGetPostList()
  }, [])
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
