import { axiosClient } from "./axiosClient"

const authApi = {
	postSignIn: <T extends { username: string; password: string }>(data: T) => {
		const url = "user"
		return axiosClient.post(url, { signIn: data })
	},
	postSignUp: <T extends { username: string; password: string }>(data: T) => {
		const url = "user"
		return axiosClient.post(url, { signUp: data })
	},
	postRefresh: <T extends { refresh: string }>(data: T) => {
		const url = "user"
		return axiosClient.post(url, { refresh: data })
	},
}
export default authApi
