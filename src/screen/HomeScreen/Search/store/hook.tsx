import React from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { searchResponseState, textSearchState } from "./atom"
import { postApi } from "~/src/api"

const useSearchPost = () => {
  const setSearchResponseState = useSetRecoilState(searchResponseState)
  const textSearch = useRecoilValue(textSearchState)
  const resetTextSearch = useResetRecoilState(textSearchState)
  const submitSearch = async () => {
    try {
      if (!textSearch) throw { data: { message: "something wrong" } }
      setSearchResponseState({ state: "isLoading", message: null, contents: [] })
      const {
        data: { message, data },
      } = await postApi.search({ search: textSearch })
      setSearchResponseState({
        state: "hasValue",
        message,
        contents: data,
      })
      resetTextSearch()
    } catch (error: any) {
      console.log(error.data)
      setSearchResponseState({ state: "hasError", message: error.data.message, contents: [] })
    }
  }
  return { submitSearch }
}
const SearchAction = {
  useSearchPost,
}
export default SearchAction
