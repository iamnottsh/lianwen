import {格式错误, 领人设} from '@/接收/人设'
import {主控体, 表据长度} from '@/数据/主控'
import {人设体} from '@/数据/人设'
import {Binary, ObjectId} from 'bson'

export async function 领主控(意: string, 证: string): Promise<主控体> {
  const gen = 领人设<主控体>(意, 证)
  const {人设, 持者, 表据} = (await gen.next()).value as Record<keyof 主控体, any>
  if (!(人设 instanceof Object)) throw new 格式错误(`主控中的人设必须用作记录`)
  await gen.next(人设 as Record<keyof 人设体, any>)
  if (!(持者 instanceof ObjectId)) throw new 格式错误(`主控中的持者必须是标识符`)
  if (!(表据 instanceof Binary)) throw new 格式错误(`主控中的表据必须是二进制`)
  if (表据.length() !== 表据长度) throw new 格式错误(`主控中的表据长度必须恰为${表据长度}`)
  return {人设, 持者, 表据}
}
