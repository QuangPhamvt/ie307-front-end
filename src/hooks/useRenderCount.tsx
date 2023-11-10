import React from "react"

export const useRenderCount = () => {
  const count = React.useRef<number>(1)
  React.useEffect(() => {
    count.current++
  })
  return count
}
