import React from "react"
import { RecoilRoot } from "recoil"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Screen, { DashboardScreen, LogInScreen, RegisterScreen, HomeScreen } from "./src/screen"

export default function App() {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <Screen />
      </RecoilRoot>
    </NavigationContainer>
  )
}
