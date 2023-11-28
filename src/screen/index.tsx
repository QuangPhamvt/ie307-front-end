import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useRecoilValue } from "recoil"
import DashboardScreen from "./DashboardScreen"
import LogInScreen from "./LogInScreen"
import RegisterScreen from "./RegisterScreen"
import HomeScreen from "./HomeScreen"
import StoryScreen from "./StoryScreen"
import { RootNativeStackParamList } from "./type"
import { authState } from "~/src/recoil/atom"
import { MessageScreenHeader } from "./MessageScreen/components"
import MessageScreen from "./MessageScreen"
import UserScreen from "./UserSscreen"

const Stack = createNativeStackNavigator<RootNativeStackParamList>()
const Screen: React.FC = () => {
  const { state } = useRecoilValue(authState)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      {state === "hasValue" ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ animation: "fade_from_bottom", animationDuration: 50 }}
          />
          <Stack.Screen name="Story" component={StoryScreen} />
          <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{
              animation: "default",
              animationDuration: 300,
              headerShown: true,
              header: () => <MessageScreenHeader />,
            }}
          />
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={{
              animation: "default",
              headerShown: true,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Screen
