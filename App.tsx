import React from "react"
import { RecoilRoot } from "recoil"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Screen from "./src/screen"
import { Text } from "react-native"

export default function App() {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <RecoilRoot>
        <NavigationContainer>
          <Screen />
        </NavigationContainer>
      </RecoilRoot>
    </React.Suspense>
  )
}
