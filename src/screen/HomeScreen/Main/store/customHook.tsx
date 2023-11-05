import React from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState, waitForAll } from "recoil"
import { postApi } from "../../../../api"
import { postListState } from "./atom"

export const usePostList = () => {
  const [postList, setPostList] = useRecoilState(postListState)
  const handleGetPostList = async () => {
    setPostList((preState) => ({ ...preState, state: "loading" }))
    const { data } = await postApi.postList({ limit: postList.data.limt, page: postList.data.nextPage })
    const newData = data.postList.map((item: any) => {
      const aspectHeight = Math.random()
      const heightImage = aspectHeight < 0.5 ? 220 : 310
      return { ...item, heightImage }
    })
    setPostList((preState) => ({
      state: "hasValue",
      data: {
        postList: [...preState.data.postList, ...newData],
        limt: 5,
        nextPage: ++preState.data.nextPage,
      },
    }))
  }
  const handleResetPostList = async () => {
    setPostList((preState) => ({ ...preState, state: "loading" }))
    const { data } = await postApi.postList({ limit: 5, page: 1 })
    const newData = data.postList.map((item: any) => {
      const aspectHeight = Math.random()
      const heightImage = aspectHeight < 0.5 ? 220 : 310
      return { ...item, heightImage }
    })
    setPostList((preState) => ({
      state: "hasValue",
      data: {
        postList: [...newData],
        limt: 5,
        nextPage: ++preState.data.nextPage,
      },
    }))
  }
  return { handleGetPostList, handleResetPostList }
}
// export const useReLoadPostList = () => {
//   const setPostList = useSetRecoilState(postListState)
//   const handleResetPostList = async () => {
//     setPostList((preState) => ({ ...preState, state: "loading" }))
//     const { data } = await postApi.postList({ limit: 5, page: 1 })
//     const newData = data.postList.map((item: any) => {
//       const aspectHeight = Math.random()
//       const heightImage = aspectHeight < 0.5 ? 220 : 310
//       return { ...item, heightImage }
//     })
//     setPostList((preState) => ({
//       state: "hasValue",
//       data: {
//         postList: [...newData],
//         limt: 5,
//         nextPage: ++preState.data.nextPage,
//       },
//     }))
//   }
//   return { handleResetPostList }
// }
