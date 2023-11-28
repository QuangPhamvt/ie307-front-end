import { useSetRecoilState } from "recoil"
import { originUserState } from "./atom"
import { UserApi } from "~/src/api/userApi"
import { followApi } from "~/src/api/followApi"

const useGetOriginUser = () => {
  const setOriginUserState = useSetRecoilState(originUserState)
  const handleGetOriginUser = async (user_id: string) => {
    try {
      if (!user_id) throw { data: { message: "Something wrong" } }
      setOriginUserState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { data, message },
      } = await UserApi.postOriginUser({ user_id })
      setOriginUserState({
        state: "hasValue",
        message,
        contents: {
          user: data[0].user,
          isFollowing: data[0].isFollowing,
          postList: data[0].postList,
        },
      })
    } catch (error: any) {
      setOriginUserState({
        state: "hasError",
        message: error.data.message,
        contents: {
          user: null,
          isFollowing: null,
          postList: [],
        },
      })
    }
  }
  return { handleGetOriginUser }
}
const usePostFollowingState = () => {
  const setOriginUserState = useSetRecoilState(originUserState)
  const handlePostFollowing = async (id: string) => {
    try {
      setOriginUserState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { message },
      } = await followApi.postFollowing({ following_id: id })
      setOriginUserState((preState) => ({
        ...preState,
        state: "hasValue",
        message,
        contents: {
          ...preState.contents,
          isFollowing: true,
        },
      }))
    } catch (error: any) {
      setOriginUserState((preState) => ({
        ...preState,
        state: "hasError",
        message: error.data.message,
      }))
    }
  }
  return { handlePostFollowing }
}

const usePostUnFollowState = () => {
  const setOriginUserState = useSetRecoilState(originUserState)
  const handlePostUnFollow = async (id: string) => {
    try {
      setOriginUserState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { message },
      } = await followApi.postUnFollowing({ following_id: id })
      setOriginUserState((preState) => ({
        ...preState,
        state: "hasValue",
        message,
        contents: {
          ...preState.contents,
          isFollowing: false,
        },
      }))
    } catch (error: any) {
      setOriginUserState((preState) => ({
        ...preState,
        state: "hasError",
        message: error.data.message,
      }))
    }
  }
  return { handlePostUnFollow }
}
const UserAction = {
  useGetOriginUser,
  usePostFollowingState,
  usePostUnFollowState,
}
export default UserAction
