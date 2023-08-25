import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import withTransaction from '@/kit/withTransaction'
import collectSama from '@/kit/存储/collectSama'
import 领主控 from '@/kit/接收/领主控'
import 角色头, {每页返回} from '@/kit/数据/角色头'
import {响应GET请求, 响应POST请求, 数据矛盾} from '@/kit/网络/响应'
import {ObjectId} from 'bson'

export const POST = 响应POST请求(async (意, 证) => {
  const {人设, 持者, 表据} = await 领主控(意, 证)
  return withTransaction(async (db, session) => {
    const collection = collectSama(db)
    if (await collection.findOne({表据}, {session, projection: {_id: true}})) throw new 数据矛盾(`发生表据碰撞`)
    const _id = new ObjectId()
    await collection.insertOne({_id, 人设, 持者, 表据}, {session})
    return _id
  })
})
export const GET = 响应GET请求(async searchParams => {
  const before = searchParams.get('before')
  const id = searchParams.get('id')
  if (id === null) throw new 数据矛盾(`搜索参数中必须有id字段`)
  const 持者 = str2_id(id)
  return withTransaction(async (db, session) => {
    const cursor = collectSama(db).find<角色头>({持者}, {session, projection: {角色: `$人设.角色`}}).sort({_id: -1})
    if (before !== null) cursor.filter({_id: {$lt: str2_id(before)}})
    return await cursor.limit(每页返回).toArray()
  })
})
