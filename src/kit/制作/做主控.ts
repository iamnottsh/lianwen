import {encode} from 'base65536'
import {Binary, ObjectId} from 'bson'
import {出加解, 包加解, 造加解} from '../安全/加解'
import 主控体 from '../数据/主控体'
import 人设体 from '../数据/人设体'
import 做人设, {给人设} from './做人设'

export default function 做主控(持者: ObjectId, 包: CryptoKey) {
  return async (情节: string, 真名: string, 萌差: string, 补充: string) => {
    const gen = 做人设<主控体>(情节, 真名, 萌差, 补充, 'sama')
    const 人设 = (await gen.next()).value as 人设体
    const 加解 = await 造加解()
    const 表节 = new Uint8Array(await 包加解(加解, 包)), 里节 = new Uint8Array(await 出加解(加解))
    const _id = (await gen.next({人设, 持者, 表据: new Binary(表节)})).value as ObjectId
    localStorage.setItem(`里节-${encode(表节)}`, encode(里节))
    return _id
  }
}

export async function 给主控({人设, 持者, 表据}: 主控体) {
  return {角色: await 给人设(人设), 持者, 表节: 表据.buffer}
}
