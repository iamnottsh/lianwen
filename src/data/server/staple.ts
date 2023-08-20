import {ecKey} from '@/data/client/role'
import {decode} from 'base65536'
import {Binary, deserialize, ObjectId} from 'bson'
import {ecAlgorithm} from '../client/chat'
import Chat, {内容最长, 向量长度} from '../common/Chat'
import {格式错误} from './tragic'

export async function verify(公证: Binary, messageBytes: Uint8Array, 签名: string) {
  const publicKey = await crypto.subtle.importKey('spki', 公证.buffer, ecKey, false, ['verify'])
  if (!await crypto.subtle.verify(ecAlgorithm, publicKey, Buffer.from(签名, 'base64'), messageBytes)) throw new 格式错误('验签不成')
}

export default async (消息: string, 签名: string, callback: (主控: ObjectId, 定义: boolean) => Promise<Binary>): Promise<Chat> => {
  const messageBytes = decode(消息)
  const {主控, 定义, 向量, 内容} = deserialize(messageBytes)
  if (!(主控 instanceof ObjectId)) throw new 格式错误(`交互中的主控必须是标识符`)
  if (typeof 定义 !== 'boolean') throw new 格式错误(`交互中的定义必须为真或假`)
  if (!(向量 instanceof Binary)) throw new 格式错误(`交互中的向量必须是二进制`)
  if (向量.length() !== 向量长度) throw new 格式错误(`交互中的向量长度必须恰为${向量长度}`)
  if (!(内容 instanceof Binary)) throw new 格式错误(`交互中的内容必须是二进制`)
  if (内容.length() > 内容最长) throw new 格式错误(`交互中的内容不得长于${内容最长}个字`)
  await verify(await callback(主控, 定义), messageBytes, 签名)
  return {主控, 定义, 内容, 向量}
}
