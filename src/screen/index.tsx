import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DashboardScreen } from "./DashboardScreen"
import { LogInScreen } from "./LogInScreen"
import { RegisterScreen } from "./RegisterScreen"
import { HomeScreen } from "./HomeScreen"
import { RootNativeStackParamList } from "./type"

export * from "./LogInScreen"
export * from "./DashboardScreen"
export * from "./RegisterScreen"
export * from "./HomeScreen"

const Stack = createNativeStackNavigator<RootNativeStackParamList>()
const Screen: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default Screen
