import React from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState, waitForAll } from "recoil"
import { postListState } from "./atom"
import { postApi } from "~/src/api"

const randomHeightImage = (): number => {
  const aspectHeight = Math.random()
  return aspectHeight < 0.5 ? 220 : 310
}
const useGetPostList = () => {
  const [getPostListState, setPostListState] = useRecoilState(postListState)
  const handleGetPostList = async () => {
    try {
      setPostListState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { data, message },
      } = await postApi.postList({
        limit: getPostListState.contents.limit,
        page: getPostListState.contents.nextPage,
      })

      let newData: any
      if (data.length > 0)
        newData = data.map(<TItem extends { id: string; image: string }>(item: TItem) => {
          return {
            ...item,
            heightImage: randomHeightImage(),
          }
        })
      else newData = data
      setPostListState((preState) => {
        if (preState.contents.postList.length > 0)
          return {
            state: "hasValue",
            message,
            contents: {
              postList: [...preState.contents.postList, ...newData],
              limit: getPostListState.contents.limit,
              nextPage: getPostListState.contents.nextPage + 1,
            },
          }
        else {
          return {
            state: "hasValue",
            message,
            contents: {
              postList: [...newData],
              limit: getPostListState.contents.limit,
              nextPage: getPostListState.contents.nextPage + 1,
            },
          }
        }
      })
    } catch (error: any) {
      console.error(error.data)
      setPostListState((preState) => ({ ...preState, state: "hasError", message: error.data.message }))
    }
  }
  return { handleGetPostList }
}

const useResetPostList = () => {
  const [getPostListState, setPostListState] = useRecoilState(postListState)
  const handleResetPostList = async () => {
    try {
      setPostListState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { data, message },
      } = await postApi.postList({
        limit: getPostListState.contents.limit,
        page: 1,
      })

      let newData: any
      if (data.length > 0)
        newData = data.map(<TItem extends { id: string; image: string }>(item: TItem) => {
          return {
            ...item,
            heightImage: randomHeightImage(),
          }
        })
      else newData = data
      setPostListState({
        state: "hasValue",
        message,
        contents: {
          postList: newData,
          limit: getPostListState.contents.limit,
          nextPage: 2,
        },
      })
    } catch (error: any) {
      console.error(error.data)
      setPostListState((preState) => ({ ...preState, state: "hasError", message: error.data.message }))
    }
  }
  return { handleResetPostList }
}
const PostAction = {
  useGetPostList,
  useResetPostList,
}
export default PostAction
