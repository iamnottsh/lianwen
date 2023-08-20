import {encode} from 'base65536'
import {Binary} from 'bson'
import Role from '../common/Role'
import {createSigner} from './chat'

export const ecAlgo = {name: 'ECDSA'}

export const ecKey = {...ecAlgo, namedCurve: 'P-521'}

export default async function role(情节: string, 真名: string, 萌差: string, 补充: string, callback: (人设: Role, 签署: (messageBytes: Uint8Array) => Promise<string>) => Promise<void>): Promise<void> {
  const {publicKey, privateKey} = await crypto.subtle.generateKey(ecKey, true, ['sign', 'verify'])
  const publicBytes = new Uint8Array(await crypto.subtle.exportKey('spki', publicKey))
  const privateBytes = new Uint8Array(await crypto.subtle.exportKey('pkcs8', privateKey))
  await callback({情节, 真名, 萌差, 补充, 公证: new Binary(publicBytes)}, createSigner(privateKey))
  localStorage.setItem(`私证-${encode(publicBytes)}`, encode(privateBytes))
}
