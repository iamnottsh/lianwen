import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import withTransaction from '@/kit/withTransaction'
import collectChat from '@/kit/存储/collectChat'
import collectHost from '@/kit/存储/collectHost'
import collectSama from '@/kit/存储/collectSama'
import {导入验} from '@/kit/安全/验签'
import {领交互} from '@/kit/接收/领交互'
import 主持体 from '@/kit/数据/主持体'
import 主控体 from '@/kit/数据/主控体'
import 交互体 from '@/kit/数据/交互体'
import 交互头, {单次返回} from '@/kit/数据/交互头'
import {响应GET请求, 响应POST请求, 数据矛盾} from '@/kit/网络/响应'
import {ObjectId} from 'bson'

export const POST = 响应POST请求(async (意, 证) => {
  const gen = 领交互(意, 证)
  const {控者, 记录} = (await gen.next()).value as 交互体
  return withTransaction(async (db, session) => {
    const 主控 = await collectSama(db).findOne<主控体>({_id: 控者}, {session, projection: {_id: false}})
    if (!主控) throw new 数据矛盾(`要回复的层不存在`)
    const 主持 = await collectHost(db).findOne<主持体>({_id: 主控.持者}, {session, projection: {_id: false}})
    if (!主持) throw new 数据矛盾(`要回复的层所处的楼不存在`)
    await gen.next(await 导入验((记录.定义 ? 主持 : 主控).人设.验据.buffer))
    await collectChat(db).insertOne({_id: new ObjectId(), 控者, 记录}, {session})
  })
})
export const GET = 响应GET请求(async searchParams => {
  const before = searchParams.get('before')
  return withTransaction(async (db, session) => {
    const cursor = collectChat(db).find<交互头>({...before !== null && {_id: {$lt: str2_id(before)}}}, {
      session,
      projection: {记录: true},
    }).sort({_id: -1})
    if (before !== null) cursor.filter({_id: {$lt: str2_id(before)}})
    return await cursor.limit(单次返回).toArray()
  })
})
