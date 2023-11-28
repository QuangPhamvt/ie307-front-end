import React from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { messageListState, textSendMessageAtom } from "./atom"
import { authState } from "~/src/recoil/atom"
import { chatApi } from "~/src/api"
import { websocketState } from "~/src/websocket/store"
import { isJsonString } from "~/src/utilities"

const useGetListMessage = () => {
  const {
    contents: { id, username, avatar },
  } = useRecoilValue(authState)
  const setMessageListState = useSetRecoilState(messageListState)
  const handleGetListMessage = async (user_id: string) => {
    let content: {
      user: {
        user_id: string
        username: string
        avatar: string | null
      }
      messages: {
        message: string
        create_at: Date
      }[]
    }[] = []
    try {
      setMessageListState({ state: "isLoading", message: null, content: [] })
      const {
        data: { data },
      } = await chatApi.postOriginChat({ user_id })
      const { user, messages } = data[0]

      if (messages.length > 0) {
        messages.forEach((item: { sender_id: string; message: string; create_at: any }) => {
          const { sender_id, message, create_at } = item
          const lengthContent = content.length
          const lastElementIndex = lengthContent - 1
          const USER_ID = lengthContent && content[lastElementIndex].user.user_id

          if (lengthContent > 0 && USER_ID === sender_id) {
            const { messages } = content[lastElementIndex]
            content[lastElementIndex].messages = [...messages, { message, create_at }]
          }
          if (lengthContent > 0 && USER_ID !== sender_id && user.user_id === sender_id) {
            content = [...content, { user, messages: [{ message, create_at }] }]
          }

          if (lengthContent > 0 && USER_ID !== sender_id && user.user_id !== sender_id) {
            content = [
              ...content,
              {
                user: {
                  user_id: id || "",
                  avatar,
                  username: username || "",
                },
                messages: [{ message, create_at }],
              },
            ]
          }

          // IF content empty
          if (lengthContent == 0 && user.user_id === sender_id) {
            content = [{ user, messages: [{ message, create_at }] }]
          }
          if (lengthContent == 0 && user.user_id !== sender_id) {
            content = [
              {
                user: {
                  user_id: id || "",
                  avatar,
                  username: username || "",
                },
                messages: [{ message, create_at }],
              },
            ]
          }
        })
        setMessageListState({ state: "hasValue", message: null, content })
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  return { handleGetListMessage }
}

const useGetMessage = () => {
  const { ws } = useRecoilValue(websocketState)
  const [{ content }, setMessageListState] = useRecoilState(messageListState)
  if (!ws) return null
  React.useEffect(() => {
    ws.onmessage = (event) => {
      if (isJsonString(event.data) && event.data) {
        const { sender_id, message } = JSON.parse(event.data)
        const length = content.length
        const USER_ID = content[0].user.user_id
        if (length > 0 && USER_ID === sender_id)
          setMessageListState((preState) => {
            const content = preState.content.map((item, index) => {
              if (index == 0) {
                let messages = [{ message, create_at: new Date(Date.now()) }, ...item.messages]
                return { ...item, messages }
              }
              return item
            })
            return { ...preState, content }
          })

        if (length > 0 && USER_ID !== sender_id)
          setMessageListState((preState) => {
            const newContent = [
              {
                user: content[1].user,
                messages: [{ message, create_at: new Date(Date.now()) }],
              },
              ...preState.content,
            ]
            return { ...preState, content: newContent }
          })
      }
    }
  }, [ws, content])
}
const useSendMessage = () => {
  const {
    contents: { id, username, avatar },
  } = useRecoilValue(authState)
  const { text } = useRecoilValue(textSendMessageAtom)
  const webSocket = React.useRef(new WebSocket(`ws://ws.ie307.customafk.com/websocket/${id}`)).current
  const [{ content }, setMessageListState] = useRecoilState(messageListState)
  const resetTextSendMessage = useResetRecoilState(textSendMessageAtom)
  const handleSendMessage = (user_id: string) => {
    const USER_ID = content[0]?.user.user_id || null
    const Stringify = JSON.stringify({
      chat: { receiver_id: user_id, message: text },
      notification: null,
    })
    if (content.length > 0 && USER_ID !== user_id) {
      setMessageListState((preState) => {
        const newContent = preState.content.map((item, index) => {
          if (index == 0)
            return { ...item, messages: [{ message: text || "", create_at: new Date(Date.now()) }, ...item.messages] }
          return item
        })
        return { ...preState, content: newContent }
      })
    }

    if (content.length > 0 && USER_ID === user_id) {
      setMessageListState((preState) => {
        const newContent = [
          {
            user: content[1].user,
            messages: [{ message: text || "", create_at: new Date(Date.now()) }],
          },
          ...preState.content,
        ]
        return { ...preState, content: newContent }
      })
    }
    if (content.length == 0) {
      setMessageListState((preState) => {
        const content = [
          {
            user: {
              user_id: id || "",
              username: username || "",
              avatar,
            },
            messages: [{ message: text || "", create_at: new Date(Date.now()) }],
          },
        ]
        return { ...preState, state: "hasValue", content }
      })
    }
    webSocket.send(Stringify)
    resetTextSendMessage()
  }
  return { handleSendMessage }
}
const MessageAction = {
  useGetListMessage,
  useGetMessage,
  useSendMessage,
}
export default MessageAction
