import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import withTransaction from '@/kit/withTransaction'
import collectHost from '@/kit/存储/collectHost'
import collectSama from '@/kit/存储/collectSama'
import {格式错误} from '@/kit/接收/领人设'
import 主持体 from '@/kit/数据/主持体'
import 主控体 from '@/kit/数据/主控体'
import 层主头 from '@/kit/数据/层主头'
import {响应细分请求, 数据矛盾} from '@/kit/网络/响应'

export const GET = 响应细分请求(async ({id}) => {
  if (typeof id !== 'string') throw new 格式错误(`楼主细分中的id必须是字符串`)
  const _id = str2_id(id)
  return withTransaction(async (db, session) => {
    const 主控 = await collectSama(db).findOne<主控体>({_id}, {session, projection: {_id: false}})
    if (!主控) throw new 数据矛盾(`层不存在`)
    const 主持 = await collectHost(db).findOne<主持体>({_id: 主控.持者}, {session, projection: {_id: false}})
    if (!主持) throw new 数据矛盾(`层所处的楼不存在`)
    return {主持, 主控} as 层主头
  })
})
