import {ObjectId} from 'bson'
import 角色体 from './角色体'

export const 每页返回 = 10

export default interface 角色头 {
  角色: 角色体
  _id: ObjectId
}
