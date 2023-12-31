import { atom } from "recoil"
import { ATOM_KEY, STATE } from "~/src/utilities"
type TRegisterFormState = {
  state: STATE
  contents: {
    email: string | null
    username: string | null
    password: string | null
  }
}
export const registerFormState = atom<TRegisterFormState>({
  key: ATOM_KEY.REGISTER_FORM,
  default: {
    state: "idle",
    contents: {
      email: null,
      username: null,
      password: null,
    },
  },
})
