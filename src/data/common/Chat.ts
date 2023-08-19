import {Binary, ObjectId} from 'bson'

export const 向量长度 = 16

export const 内容最长 = 500

export default interface Chat {
  主控: ObjectId
  定义: boolean
  向量: Binary
  内容: Binary
}
