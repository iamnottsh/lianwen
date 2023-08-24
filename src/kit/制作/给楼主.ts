import {导入包} from '@/kit/安全/包拆'
import 楼主头 from '../数据/楼主头'

export default async function 给楼主({角色, 包据}: 楼主头) {
  return {角色, 包: await 导入包(包据.buffer)}
}
