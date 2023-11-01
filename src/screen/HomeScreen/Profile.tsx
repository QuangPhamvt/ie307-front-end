import React from "react"
import { HomeTabScreenProps } from "../type"
import { SafeAreaView, Text, View } from "react-native"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}
export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  )
}
