import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"

export type TLoginState = {
  state: STATE
  contents: {
    email: string | null
    password: string | null
  }
}
export type TRegisterState = {
  state: STATE
  contents: {
    email: string | null
    username: string | null
    password: string | null
  }
}
export const logInState = atom<TLoginState>({
  key: ATOM_KEY.LOG_IN_FORM,
  default: {
    state: "idle",
    contents: {
      email: null,
      password: null,
    },
  },
})
