import React from "react"
import { Image, ImageProps } from "react-native"

interface CustomImageProps extends ImageProps {
  className: string
}
export const CustomImage: React.FC<CustomImageProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const handleOnLoading = (value: boolean) => {
    setIsLoading(value)
  }
  const { className = "" } = props
  return (
    <Image
      {...props}
      onLoadStart={() => handleOnLoading(true)}
      onLoadEnd={() => handleOnLoading(false)}
      className={`${className} ${isLoading ? "animate-pulse" : ""}`}
    />
  )
}
