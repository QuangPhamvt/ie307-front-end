import { atom } from "recoil"
type TRegisterFormState = {
  email: string
  username: string
  password: string
}
export const RegisterFormState = atom<TRegisterFormState>({
  key: "RegisterForm",
  default: {
    email: "",
    username: "",
    password: "",
  },
})
