import { atom } from "recoil"

export type TLoginState = {
  email: string
  password: string
}
export const logInState = atom<TLoginState>({
  key: "LogIn",
  default: { email: "", password: "" },
})
