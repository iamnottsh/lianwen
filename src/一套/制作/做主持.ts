import {encode} from 'base65536'
import {Binary} from 'bson'
import {导入包, 导出包, 导出拆, 造包拆} from '../安全/包拆'
import 主持体 from '../数据/主持体'
import 人设体 from '../数据/人设体'
import 做人设, {给人设} from './做人设'

export default async function 做主持(情节: string, 真名: string, 萌差: string, 补充: string, 提交: (意: string, 证: string) => Promise<void>) {
  const gen = 做人设<主持体>(情节, 真名, 萌差, 补充, 提交)
  const 人设 = (await gen.next()).value as 人设体
  const {publicKey: 包, privateKey: 拆} = await 造包拆()
  const 包节 = new Uint8Array(await 导出包(包)), 拆节 = new Uint8Array(await 导出拆(拆))
  await gen.next({人设, 包据: new Binary(包节)})
  localStorage.setItem(`拆节-${encode(包节)}`, encode(拆节))
}

export async function 给主持({人设, 包据}: 主持体) {
  return {角色: await 给人设(人设), 包: await 导入包(包据.buffer)}
}
