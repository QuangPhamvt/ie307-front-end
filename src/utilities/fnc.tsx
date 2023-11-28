import { Buffer } from "buffer"
export function encodeJWT(token: string) {
  const part = token
    .split(".")
    .map((part) => Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString())
  return JSON.parse(part[1])
}

export function checkIsMail(mail: string) {
  const isMatch = mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  return !!isMatch
}

export function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
