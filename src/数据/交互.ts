import {Binary, ObjectId} from 'bson'

export const 向量长度 = 16
export const 表码最长 = 500

export interface 交互体 {
  控者: ObjectId
  定义: boolean
  向量: Binary
  表码: Binary
}
