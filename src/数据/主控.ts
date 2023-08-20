import {Binary, ObjectId} from 'bson'
import {人设体} from './人设'

export const 表据长度 = 512

export interface 主控体 {
  人设: 人设体
  持者: ObjectId
  表据: Binary
}
