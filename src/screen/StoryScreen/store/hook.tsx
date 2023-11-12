import { useSetRecoilState } from "recoil"
import { postApi } from "~/src/api"
import { originPostAtom } from "./atom"

export const useGetOriginPost = (postId: string) => {
  const setOriginPost = useSetRecoilState(originPostAtom)
  const getOriginPost = async () => {
    try {
      setOriginPost((preState) => ({ ...preState, state: "loading" }))
      const response = await postApi.originPost({ postId })
      setOriginPost({
        state: "hasValue",
        data: response.data.originPost,
      })
      setOriginPost((preState) => ({ ...preState, state: "hasValue" }))
    } catch (error: any) {
      console.log(error)
      setOriginPost({ state: "hasError", data: undefined })
    }
  }
  return { getOriginPost }
}
