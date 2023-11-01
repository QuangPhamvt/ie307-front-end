import { View, ImageBackground, SafeAreaView } from "react-native"
import AuthLogin from "./AuthLogin"

export const AuthComponent = () => {
	return (
		<SafeAreaView>
			<View>
				<ImageBackground source={require("../../../assets/bg-auth.webp")}>
					<AuthLogin />
				</ImageBackground>
			</View>
		</SafeAreaView>
	)
}
