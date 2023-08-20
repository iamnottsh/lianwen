import {encode} from 'base65536'
import {Binary, ObjectId, serialize} from 'bson'
import Sama from '../common/Sama'
import {aesAlgo} from './chat'
import role from './role'

const rsaAlgo = {name: 'RSA-OAEP'}

export const rsaAlgorithm = {...rsaAlgo, hash: 'SHA-512'}

const aesKey = {...aesAlgo, length: 256}

export default async function sama(情节: string, 萌差: string, 真名: string, 补充: string, 主持: ObjectId, 公钥: CryptoKey, callback: (消息: string, 签名: string) => Promise<void>): Promise<void> {
  await role(情节, 萌差, 真名, 补充, async (人设, 签署) => {
    const unwrappedKey = await crypto.subtle.generateKey(aesKey, true, ['encrypt', 'decrypt'])
    const unwrappedBytes = new Uint8Array(await crypto.subtle.exportKey('raw', unwrappedKey))
    const wrappedBytes = new Uint8Array(await crypto.subtle.wrapKey('raw', unwrappedKey, 公钥, rsaAlgo))
    const message: Sama = {主持, 人设, 包钥: new Binary(wrappedBytes)}
    const messageBytes = serialize(message)
    await callback(encode(messageBytes), await 签署(messageBytes))
    localStorage.setItem(`解钥-${encode(wrappedBytes)}`, encode(unwrappedBytes))
  })
}
