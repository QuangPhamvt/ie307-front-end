import React, { ReactElement } from "react"
import MasonryList from "@react-native-seoul/masonry-list"
import { View, Text, Image, TouchableOpacity } from "react-native"
const fakeDate: { uri: string }[] = [
  {
    uri: "https://images.pexels.com/photos/2397652/pexels-photo-2397652.jpeg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfb2ZfY2xvdWRzX2dyYWRpZW50X2dsaXR0ZXJfb25fc2ltcF8zNzFmOGU1Zi1jZTM2LTRjNjctOWMyZC1lMWZkZTI1YmEwM2ZfMS5qcGc.jpg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODktYmctMDYtZC14LmpwZw.jpg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODktYmctMDYtZC14LmpwZw.jpg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODktYmctMDYtZC14LmpwZw.jpg",
  },
  {
    uri: "https://images.pexels.com/photos/2397652/pexels-photo-2397652.jpeg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfb2ZfY2xvdWRzX2dyYWRpZW50X2dsaXR0ZXJfb25fc2ltcF8zNzFmOGU1Zi1jZTM2LTRjNjctOWMyZC1lMWZkZTI1YmEwM2ZfMS5qcGc.jpg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODktYmctMDYtZC14LmpwZw.jpg",
  },
  {
    uri: "https://images.pexels.com/photos/2397652/pexels-photo-2397652.jpeg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfb2ZfY2xvdWRzX2dyYWRpZW50X2dsaXR0ZXJfb25fc2ltcF8zNzFmOGU1Zi1jZTM2LTRjNjctOWMyZC1lMWZkZTI1YmEwM2ZfMS5qcGc.jpg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODktYmctMDYtZC14LmpwZw.jpg",
  },
  {
    uri: "https://images.pexels.com/photos/2397652/pexels-photo-2397652.jpeg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfb2ZfY2xvdWRzX2dyYWRpZW50X2dsaXR0ZXJfb25fc2ltcF8zNzFmOGU1Zi1jZTM2LTRjNjctOWMyZC1lMWZkZTI1YmEwM2ZfMS5qcGc.jpg",
  },
  {
    uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODktYmctMDYtZC14LmpwZw.jpg",
  },
]
interface BrowseImageItemComponentProps {
  item: { uri: string }
}
interface BrowseImageListComponentProps {}
interface BrowserComponentProps {}
const BrowseImageItemComponent: React.FC<Partial<BrowseImageItemComponentProps>> = (props) => {
  const { item } = props
  const aspectHeight = Math.random()
  const heightImage = aspectHeight < 0.5 ? 220 : 310
  return (
    <Image
      className="m-1 rounded-md border-[1px] object-contain"
      height={heightImage}
      source={{ uri: item?.uri || "" }}
    />
  )
}
const BrowseImageListComponent: React.FC<BrowseImageListComponentProps> = () => {
  const rederItem = ({ item }: { item: any }): React.ReactElement => {
    return <BrowseImageItemComponent item={item} />
  }
  return (
    <View className="mt-4">
      <MasonryList data={fakeDate} renderItem={rederItem} numColumns={2} />
    </View>
  )
}
export const BrowseComponent: React.FC<BrowserComponentProps> = (props) => {
  const {} = props
  return (
    <View className="mx-4 mt-8">
      <Text className="ml-2 font-bold">BROWSE ALL</Text>
      <BrowseImageListComponent />
      <TouchableOpacity className="mt-2 w-full items-center rounded-lg border-2 border-black p-4">
        <Text>SEE MORE</Text>
      </TouchableOpacity>
    </View>
  )
}
