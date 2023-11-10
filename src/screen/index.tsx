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
import { useWebSocket } from "~/src/websocket"
import MessageScreen from "./MessageScreen"
import { MessageScreenHeader } from "./MessageScreen/components"

const Stack = createNativeStackNavigator<RootNativeStackParamList>()
const Screen: React.FC = () => {
  const auth = useRecoilValue(authState)
  console.log("AuthData", auth)
  useWebSocket(auth.data.id)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Message">
      {auth.state === "hasValue" ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ animation: "fade_from_bottom" }} />
          <Stack.Screen name="Story" component={StoryScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{ headerShown: true, header: () => <MessageScreenHeader /> }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Screen
