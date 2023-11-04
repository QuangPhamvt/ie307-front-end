import React from "react"
import { RecoilRoot } from "recoil"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Screen from "./src/screen"

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Screen />
      </NavigationContainer>
    </RecoilRoot>
  )
}
