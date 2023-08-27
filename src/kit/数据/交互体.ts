import {ObjectId} from 'bson'
import 记录体 from './记录体'

export default interface 交互体 {
  控者: ObjectId
  记录: 记录体
}
