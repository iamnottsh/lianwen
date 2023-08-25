import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import withTransaction from '@/kit/withTransaction'
import collectHost from '@/kit/存储/collectHost'
import 领主持 from '@/kit/接收/领主持'
import 角色体 from '@/kit/数据/角色体'
import {响应GET请求, 响应POST请求, 数据矛盾} from '@/kit/网络/响应'
import {ObjectId} from 'bson'

export const POST = 响应POST请求<ObjectId>(async (意, 证) => {
  const {人设, 包据} = await 领主持(意, 证)
  return withTransaction(async (db, session) => {
    const collection = collectHost(db)
    if (await collection.findOne({包据}, {session, projection: {_id: true}})) throw new 数据矛盾(`发生包据碰撞`)
    const _id = new ObjectId()
    await collection.insertOne({_id, 人设, 包据}, {session})
    return _id
  })
})
export const GET = 响应GET请求(async searchParams => {
  const before = searchParams.get('before')
  return withTransaction(async (db, session) => {
    const cursor = collectHost(db).find<{角色: 角色体, _id: ObjectId}>({}, {session, projection: {角色: `$人设.角色`}}).sort({_id: -1})
    if (before !== null) cursor.filter({_id: {$lt: str2_id(before)}})
    return await cursor.limit(10).toArray()
  })
})

