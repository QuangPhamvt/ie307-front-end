import React from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { textSendMessageAtom } from "./atom"
import { authState, chatAtom } from "~/src/recoil/atom"
import dayjs from "dayjs"

type TUseSendMessage = string
export const useSendMessage = <T extends TUseSendMessage>(receiver_id: T) => {
  const auth = useRecoilValue(authState)
  const ws = React.useRef(new WebSocket(`ws://ws.ie307.customafk.com/websocket/${auth.data.id}`)).current
  const resetTextSend = useResetRecoilState(textSendMessageAtom)
  const [textSendMessage, setTextSendMessage] = useRecoilState(textSendMessageAtom)
  const setOriginChatAtom = useSetRecoilState(chatAtom)
  const send = (message: string) =>
    ws.send(
      JSON.stringify({
        chat: {
          receiver_id,
          message: message,
        },
      }),
    )
  const handleSubmit = () => {
    const dataSendMessage = {
      sender_id: auth.data.id,
      receiver_id,
      message: textSendMessage,
      createAt: dayjs(Date.now()),
    }
    setOriginChatAtom((preState): any => {
      if (preState.data.originChat)
        return {
          ...preState,
          data: { ...preState.data, originChat: [dataSendMessage, ...preState.data.originChat] },
        }
      return preState
    })
    send(textSendMessage)
    resetTextSend()
  }
  return { textSendMessage, setTextSendMessage, handleSubmit }
}

export const useConvertData = (
  message: Array<{ sender_id: string; receiver_id: string; message: string; createAt: string }>,
) => {
  let payload = [
    {
      sender_id: message[0].sender_id,
      message: [
        {
          message: message[0].message,
          createAt: message[0].createAt,
        },
      ],
    },
  ]
  for (let i = 1; i < message.length - 1; i++) {
    if (message[i - 1].sender_id === message[i].sender_id) {
      payload[payload.length - 1] = {
        ...payload[payload.length - 1],
        message: [
          ...payload[payload.length - 1].message,
          {
            message: message[i].message,
            createAt: message[i].createAt,
          },
        ],
      }
    }
    if (message[i - 1].sender_id !== message[i].sender_id) {
      payload.push({
        sender_id: message[i].sender_id,
        message: [
          {
            message: message[i].message,
            createAt: message[i].createAt,
          },
        ],
      })
    }
  }
  return payload
}
