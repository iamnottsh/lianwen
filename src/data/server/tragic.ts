import {verify} from './staple'
import {decode} from 'base65536'
import {Binary, deserialize} from 'bson'
import Role, {公证长度, 情节最短, 情节最长, 真名最短, 真名最长, 萌差选项, 补充最长} from '../common/Role'

export class 格式错误 extends Error {
  constructor(message: string) {
    super(message)
    this.name = '格式错误'
  }
}

export default <T>(callback: (message: Record<keyof T, any>, checker: (人设: Record<keyof Role, any>) => Promise<void>) => Promise<void>) => async (消息: string, 签名: string) => {
  const messageBytes = decode(消息)
  const message = deserialize(messageBytes)
  await callback(message as Record<keyof T, any>, async ({情节, 真名, 萌差, 补充, 公证}) => {
    if (typeof 情节 !== 'string') throw new 格式错误(`人设中的情节必须是字符串`)
    if (情节.length < 情节最短) throw new 格式错误(`人设中的情节不得短于${情节最短}个字`)
    if (情节.length > 情节最长) throw new 格式错误(`人设中的情节不得长于${情节最长}个字`)
    if (typeof 真名 !== 'string') throw new 格式错误(`人设中的真名必须是字符串`)
    if (真名.length < 真名最短) throw new 格式错误(`人设中的真名不得短于${真名最短}个字`)
    if (真名.length > 真名最长) throw new 格式错误(`人设中的真名不得长于${真名最长}个字`)
    if (typeof 萌差 !== 'string') throw new 格式错误(`人设中的萌差必须是字符串`)
    if (!萌差选项.includes(萌差)) throw new 格式错误(`人设中的萌差必须属于{${萌差选项.join()}}`)
    if (typeof 补充 !== 'string') throw new 格式错误(`人设中的补充必须是字符串`)
    if (补充.length > 补充最长) throw new 格式错误(`人设中的补充不得长于${补充最长}个字`)
    if (!(公证 instanceof Binary)) throw new 格式错误(`人设中的公证必须是二进制`)
    if (公证.length() !== 公证长度) throw new 格式错误(`人设中的公证长度必须恰为${公证长度}`)
    await verify(公证, messageBytes, 签名)
  })
  return message as T
}
