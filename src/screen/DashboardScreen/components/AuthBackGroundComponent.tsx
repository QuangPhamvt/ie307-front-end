import { Image } from "react-native"

interface AuthBackGroundProps {
  className: string
}
export const AuthBackGroundComponent: React.FC<Partial<AuthBackGroundProps>> = (props) => {
  return <Image className="h-full w-full" source={require("../../../../assets/bg-auth.webp")} />
}
