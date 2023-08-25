import 角色体 from '@/kit/数据/角色体'
import {ObjectId} from 'bson'

export const 每页返回 = 10

export default interface 角色头 {
  角色: 角色体
  _id: ObjectId
}
