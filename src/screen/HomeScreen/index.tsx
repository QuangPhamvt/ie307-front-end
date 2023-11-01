import { HomeTabParamList, RootNativeStackScreenProps } from "../type"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MainScreen } from "./Main"
import { ProfileScreen } from "./Profile"
import { AntDesign, Feather } from "@expo/vector-icons"
import { SearchScreen } from "./Search"
import { ChatScreen } from "./Chat"
import { UploadScreen } from "./Upload"
import { TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
interface HomeScreenProps extends RootNativeStackScreenProps<"Home"> {}
const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeScreen = (props: HomeScreenProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "Main")
            return (
              <View
                className={`flex h-full w-full items-center justify-center ${
                  focused ? "border-t-[1px] border-black" : ""
                }`}
              >
                <Feather name="home" size={24} color={focused ? "#000" : "#ccc"} />
              </View>
            )
          if (route.name === "Search")
            return (
              <View
                className={`flex h-full w-full items-center justify-center ${
                  focused ? "border-t-[1px] border-black" : ""
                }`}
              >
                <Feather name="search" size={24} color={focused ? "#000" : "#ccc"} />
              </View>
            )
          if (route.name === "Upload")
            return (
              <View className="w-full py-1">
                <LinearGradient
                  className="flex h-full w-full items-center justify-center rounded-full"
                  colors={["#FF4B91", "#E95793", "#DA0C81"]}
                >
                  <AntDesign name="plus" size={24} color={focused ? "#000" : "#ccc"} />
                </LinearGradient>
              </View>
            )
          if (route.name === "Chat")
            return (
              <View
                className={`flex h-full w-full items-center justify-center ${
                  focused ? "border-t-[1px] border-black" : ""
                }`}
              >
                <Feather name="message-circle" size={24} color={focused ? "#000" : "#ccc"} />
              </View>
            )
          if (route.name === "Profile")
            return (
              <View
                className={`flex h-full w-full items-center justify-center ${
                  focused ? "border-t-[1px] border-black" : ""
                }`}
              >
                <Feather name="user" size={24} color={focused ? "#000" : "#ccc"} />
              </View>
            )
        },
        tabBarButton: (props) => {
          return <TouchableOpacity {...props} />
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: "#D0D4CA",
        },
        tabBarShowLabel: false,
      })}
      initialRouteName="Main"
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
