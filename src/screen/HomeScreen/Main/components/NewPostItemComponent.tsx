import React from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { HomeTabScreenProps } from "~/src/screen/type"
import { useNavigation } from "@react-navigation/native"

type NewPostItemComponentProps = {
  uri: string
} & HomeTabScreenProps<"Main">

interface AvatarComponentProps {
  width: number
  height: number
}
const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
  const { width, height } = props
  return (
    <View className="flex flex-row items-center ">
      <Image
        width={width}
        height={height}
        className="rounded-full"
        source={{
          uri: "https://images8.alphacoders.com/125/1251911.jpg",
        }}
      />
      <View className="ml-2 flex">
        <Text className="font-bold">Mami Nanami</Text>
        <Text className="text-black/[0.5]">@ridzjcob</Text>
      </View>
    </View>
  )
}
export const NewPostItemComponent: React.FC<Partial<NewPostItemComponentProps>> = (props) => {
  const { uri } = props
  const navigation = useNavigation()
  const lastTap = React.useRef<number>(0)
  return (
    <View className="flex aspect-square w-screen items-center justify-around ">
      <TouchableOpacity activeOpacity={0.9}>
        <View className="aspect-square w-[calc(85%)]">
          <Image className="h-full w-full" source={{ uri }} />
        </View>
      </TouchableOpacity>
      <View className="h-[calc(15%)] w-[calc(85%)] justify-center ">
        <AvatarComponent width={42} height={42} />
      </View>
    </View>
  )
}
