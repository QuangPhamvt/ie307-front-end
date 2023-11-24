import * as SecureStore from "expo-secure-store"

export const SetAccessTokenSecureStore = async (token: string) => {
  await SecureStore.setItemAsync("ie307_access_token", token)
}
export const SetRefreshTokenSecureStore = async (token: string) => {
  await SecureStore.setItemAsync("ie307_refresh_token", token)
}
