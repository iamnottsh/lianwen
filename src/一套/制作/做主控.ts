import {出加解, 包加解, 造加解} from '@/一套/安全/加解'
import {encode} from 'base65536'
import {Binary, ObjectId} from 'bson'
import 主控体 from '../数据/主控体'
import 人设体 from '../数据/人设体'
import 做人设, {给人设} from './做人设'

export default async function 做主控(情节: string, 真名: string, 萌差: string, 补充: string, 提交: (意: string, 证: string) => Promise<void>, 持者: ObjectId, 包: CryptoKey) {
  const gen = 做人设<主控体>(情节, 真名, 萌差, 补充, 提交)
  const 人设 = (await gen.next()).value as 人设体
  const 加解 = await 造加解()
  const 表节 = new Uint8Array(await 包加解(加解, 包)), 里节 = new Uint8Array(await 出加解(加解))
  await gen.next({人设, 持者, 表据: new Binary(表节)})
  localStorage.setItem(`里节-${encode(表节)}`, encode(里节))
}

export async function 给主控({人设, 持者, 表据}: 主控体) {
  return {角色: await 给人设(人设), 持者, 表节: 表据.buffer}
}
