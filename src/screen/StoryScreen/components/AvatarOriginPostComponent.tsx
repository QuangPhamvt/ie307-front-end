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
    <View className="flex flex-row items-center p-4 gap-x-2 ">
      <View className="w-10 h-10 rounded-full ">
        {authorAvatar && (
          <Image
            className="w-full h-full rounded-full"
            source={{
              uri: authorAvatar,
            }}
          />
        )}
      </View>
      <View className="flex space-y-1">
        <Text className="text-base font-bold leading-4 text-white">{title}</Text>
        <Text className="text-sm leading-4 text-gray-600">@{authorUsername}</Text>
      </View>
    </View>
  )
}
