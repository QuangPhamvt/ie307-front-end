import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootNativeStackParamList = {
  Dashboard: undefined
  Login: undefined
  Register: undefined
  Home: NavigatorScreenParams<HomeTabParamList>
}
export type RootNativeStackScreenProps<T extends keyof RootNativeStackParamList> = NativeStackScreenProps<
  RootNativeStackParamList,
  T
>
export type HomeTabParamList = {
  Main: undefined
  Search: undefined
  Upload: undefined
  Chat: undefined
  Profile: undefined
}
export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  RootNativeStackScreenProps<keyof RootNativeStackParamList>
>
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNativeStackParamList {}
  }
}
