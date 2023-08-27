import {Binary} from 'bson'

export const 向量长度 = 16
export const 表码最长 = 500

export default interface 记录体 {
  定义: boolean
  向量: Binary
  表码: Binary
}
