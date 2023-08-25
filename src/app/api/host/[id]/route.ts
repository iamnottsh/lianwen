import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import withTransaction from '@/kit/withTransaction'
import collectHost from '@/kit/存储/collectHost'
import {格式错误} from '@/kit/接收/领人设'
import 楼主头 from '@/kit/数据/楼主头'
import {响应细分请求, 数据矛盾} from '@/kit/网络/响应'

export const GET = 响应细分请求(async ({id}) => {
  if (typeof id !== 'string') throw new 格式错误(`细分中的id必须是字符串`)
  const _id = str2_id(id)
  return withTransaction(async (db, session) => {
    const 楼主 = await collectHost(db).findOne<楼主头>({_id}, {session, projection: {_id: false, 角色: '$人设.角色', 包据: true}})
    if (!楼主) throw new 数据矛盾(`楼不存在`)
    return 楼主
  })
})
