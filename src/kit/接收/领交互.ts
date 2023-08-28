import {向量长度, 表码最长} from '../数据/记录体'
import {decode} from 'base65536'
import {Binary, deserialize, ObjectId} from 'bson'
import {搞验证} from '../安全/验签'
import 交互体 from '../数据/交互体'
import {格式错误} from './领人设'

export async function* 领交互(意: string, 证: string): AsyncGenerator<交互体 | void, void, void | CryptoKey> {
  const 文 = decode(意)
  const {控者, 记录: {定义, 向量, 表码}} = deserialize(文) as Record<keyof 交互体, any>
  if (!(控者 instanceof ObjectId)) throw new 格式错误(`交互中的控者必须是标识符`)
  if (typeof 定义 !== 'boolean') throw new 格式错误(`交互中的定义必须为真或假`)
  if (!(向量 instanceof Binary)) throw new 格式错误(`交互中的向量必须是二进制`)
  if (向量.length() !== 向量长度) throw new 格式错误(`交互中的向量长度必须恰为${向量长度}`)
  if (!(表码 instanceof Binary)) throw new 格式错误(`交互中的内容必须是二进制`)
  if (表码.length() > 表码最长) throw new 格式错误(`交互中的内容不得长于${表码最长}个字`)
  await 搞验证((yield {控者, 记录: {定义, 向量, 表码}}) as CryptoKey, 证, 文)
}
