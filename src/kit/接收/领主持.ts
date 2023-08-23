import {Binary} from 'bson'
import {导入包} from '../安全/包拆'
import 主持体, {包据长度} from '../数据/主持体'
import 领人设, {格式错误} from './领人设'

export default async function 领主持(意: string, 证: string): Promise<主持体> {
  const gen = 领人设<主持体>(意, 证)
  const {人设, 包据} = (await gen.next()).value as Record<keyof 主持体, any>
  if (!(人设 instanceof Object)) throw new 格式错误(`主持中的人设必须用作记录`)
  await gen.next(人设)
  if (!(包据 instanceof Binary)) throw new 格式错误(`主持中的包据必须是二进制`)
  if (包据.length() !== 包据长度) throw new 格式错误(`主持中的包据长度必须恰为${包据长度}`)
  try {
    await 导入包(包据.buffer)
  } catch {
    throw new 格式错误(`主持中的包据必须能被导入`)
  }
  return {人设, 包据}
}
