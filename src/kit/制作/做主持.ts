import {encode} from 'base65536'
import {Binary, ObjectId} from 'bson'
import {导出包, 导出拆, 造包拆} from '../安全/包拆'
import 主持体 from '../数据/主持体'
import 人设体 from '../数据/人设体'
import 角色体 from '../数据/角色体'
import 做人设 from './做人设'

export default async function 做主持(角色: 角色体) {
  const gen = 做人设<主持体>(角色, 'host')
  const 人设 = (await gen.next()).value as 人设体
  const {publicKey: 包, privateKey: 拆} = await 造包拆()
  const 包节 = new Uint8Array(await 导出包(包)), 拆节 = new Uint8Array(await 导出拆(拆))
  const _id = (await gen.next({人设, 包据: new Binary(包节)})).value as ObjectId
  localStorage.setItem(`拆节-${encode(包节)}`, encode(拆节))
  return _id
}
