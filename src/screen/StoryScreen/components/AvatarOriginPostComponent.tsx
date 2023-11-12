import React from "react"
import { View, Image, Text } from "react-native"

export type TAvatarOriginPostComponent = {
  title: string
  authorUsername: string
  authorAvatar: string | null
}
export const AvatarOriginPostComponent: React.FC<TAvatarOriginPostComponent> = (props) => {
  const { title, authorUsername, authorAvatar } = props
  return (
    <View className="flex flex-row items-center gap-x-2 p-4">
      <View className="h-10 w-10 rounded-full">
        {authorAvatar && (
          <Image
            className="h-full w-full rounded-full"
            source={{
              uri: authorAvatar,
            }}
          />
        )}
      </View>
      <View className="">
        <Text className="text-base font-bold leading-4 text-white">{title}</Text>
        <Text className="text-sm leading-3 text-[#ccc]">@{authorUsername}</Text>
      </View>
    </View>
  )
}
