import withTransaction from '@/kit/withTransaction'
import collectSama from '@/kit/存储/collectSama'
import 领主控 from '@/kit/接收/领主控'
import {响应POST请求, 数据矛盾} from '@/kit/网络/响应'
import {ObjectId} from 'bson'

export const POST = 响应POST请求<ObjectId>(async (意, 证) => {
  const {人设, 持者, 表据} = await 领主控(意, 证)
  return withTransaction(async (db, session) => {
    const collection = collectSama(db)
    if (await collection.findOne({表据}, {session, projection: {_id: 1}})) throw new 数据矛盾(`发生表据碰撞`)
    const _id = new ObjectId()
    await collection.insertOne({_id, 人设, 持者, 表据})
    return _id
  })
})
