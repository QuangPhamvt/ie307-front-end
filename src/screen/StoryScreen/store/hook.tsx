import { useSetRecoilState } from "recoil"
import { postApi } from "~/src/api"
import { originPostState } from "./atom"

const useGetOriginPost = () => {
  const setOriginPostState = useSetRecoilState(originPostState)
  const getOriginPost = async (postId: string) => {
    try {
      setOriginPostState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { data, message },
      } = await postApi.originPost({ post_id: postId })
      console.log(data.length)

      const {
        originPost: { post_id, title, image, author },
      } = data[0]
      setOriginPostState({
        state: "hasValue",
        message,
        contents: {
          post_id,
          title,
          image,
          author,
        },
      })
    } catch (error: any) {
      console.error(error)
      setOriginPostState((preState) => ({ ...preState, state: "hasError", message: error.data.message }))
    }
  }
  return { getOriginPost }
}

const StoryAction = {
  useGetOriginPost,
}
export default StoryAction
