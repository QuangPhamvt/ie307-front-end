import { View, SafeAreaView } from "react-native"
import { RootNativeStackScreenProps } from "~/src/screen/type"
import React from "react"
import { AuthNavigationComponent, AuthBackGroundComponent } from "./components"
interface DashboardScreenProps extends RootNativeStackScreenProps<"Dashboard"> {}

const DashboardScreen = (props: DashboardScreenProps) => {
  const { navigation } = props
  return (
    <SafeAreaView className="flex h-full w-full justify-around bg-black">
      <View className="flex h-full w-full justify-center bg-transparent bg-white">
        <View className="mb-2 shrink">
          <AuthBackGroundComponent />
        </View>
        <AuthNavigationComponent className="shrink-0 " navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}
export default DashboardScreen
