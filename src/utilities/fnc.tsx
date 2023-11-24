import { Buffer } from "buffer"
export function encodeJWT(token: string) {
  const part = token
    .split(".")
    .map((part) => Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString())
  return JSON.parse(part[1])
}
