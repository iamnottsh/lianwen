import {ObjectId} from 'bson'
import 记录体 from './记录体'

export const 单次返回 = 10

export default interface 交互头 {
  记录: 记录体
  _id: ObjectId
}
