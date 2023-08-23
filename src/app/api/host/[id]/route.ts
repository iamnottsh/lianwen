import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import withTransaction from '@/kit/withTransaction'
import collectHost from '@/kit/存储/collectHost'
import {格式错误} from '@/kit/接收/领人设'
import 主持体 from '@/kit/数据/主持体'
import {响应细分请求, 数据矛盾} from '@/kit/网络/响应'

export const GET = 响应细分请求<主持体>(async ({id}) => {
  if (typeof id !== 'string') throw new 格式错误(`细分中的id必须是字符串`)
  const _id = str2_id(id)
  return withTransaction(async (db, session) => {
    const collectionHost = collectHost(db)
    const 主持 = await collectionHost.findOne<主持体>({_id}, {session, projection: {_id: false}})
    if (!主持) throw new 数据矛盾(`该主持不存在`)
    return 主持
  })
})
