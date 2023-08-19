import {encode} from 'base65536'
import {Binary, ObjectId, serialize} from 'bson'
import {向量长度} from '../common/Chat'
import {ecAlgo} from './role'

export const aesAlgo = {name: 'AES-GCM'}

export const ecAlgorithm = {...ecAlgo, hash: 'SHA-512'}

export const createSigner = (privateKey: CryptoKey) => async (messageBytes: Uint8Array): Promise<string> => {
  const signedBytes = new Uint8Array(await crypto.subtle.sign(ecAlgorithm, privateKey, messageBytes))
  return encode(signedBytes)
}

export default async function chat(主控: ObjectId, 定义: boolean, 动静: string, unwrappedKey: CryptoKey, signer: (messageBytes: Uint8Array) => Promise<string>, callback: (消息: string, 签名: string) => Promise<void>): Promise<void> {
  const iv = crypto.getRandomValues(new Uint8Array(向量长度))
  const contentBytes = new Uint8Array(await crypto.subtle.encrypt({...aesAlgo, iv}, unwrappedKey, new TextEncoder().encode(动静)))
  const messageBytes = serialize({主控, 定义, 向量: new Binary(iv), 内容: new Binary(contentBytes)})
  await callback(encode(messageBytes), await signer(messageBytes))
}
