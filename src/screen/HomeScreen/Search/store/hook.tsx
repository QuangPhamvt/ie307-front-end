import React from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { searchAtom, textSearchAtom } from "./atom"
import { postApi } from "~/src/api"

export const useSearchPost = () => {
  const setSearch = useSetRecoilState(searchAtom)
  const textSearch = useRecoilValue(textSearchAtom)
  const resetTextSearch = useResetRecoilState(textSearchAtom)
  const submitSearch = React.useCallback(async () => {
    try {
      setSearch({ state: "loading", data: undefined })
      console.log(textSearch)
      const response = await postApi.search({ search: textSearch })
      if (response.data) {
        console.log(response.data)
        setSearch({ state: "hasValue", data: response.data.posts })

        resetTextSearch()
      }
    } catch (error: any) {
      console.log(error)
      setSearch({ state: "hasError", data: undefined })
    }
  }, [textSearch])
  return { submitSearch }
}
