import {encode} from 'base65536'
import {Binary, serialize} from 'bson'
import {rsaAlgorithm} from '../client/sama'
import role from './role'

const rsaAlgo = {...rsaAlgorithm, modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1])}

export default async function host(情节: string, 真名: string, 萌差: string, 补充: string, callback: (消息: string, 签名: string) => Promise<void>): Promise<void> {
  await role(情节, 真名, 萌差, 补充, async (人设, 签署) => {
    const {publicKey, privateKey} = await crypto.subtle.generateKey(rsaAlgo, true, ['wrapKey', 'unwrapKey'])
    const publicBytes = new Uint8Array(await crypto.subtle.exportKey('spki', publicKey))
    const privateBytes = new Uint8Array(await crypto.subtle.exportKey('pkcs8', privateKey))
    const messageBytes = serialize({人设, 公钥: new Binary(publicBytes)})
    await callback(encode(messageBytes), await 签署(messageBytes))
    localStorage.setItem(`私钥-${encode(publicBytes)}`, encode(privateBytes))
  })
}
