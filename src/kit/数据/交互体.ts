import 记录体 from './记录体'
import {ObjectId} from 'bson'

export default interface 交互体 {
  控者: ObjectId
  记录: 记录体
}
