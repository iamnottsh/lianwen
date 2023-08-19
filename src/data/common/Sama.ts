import Role from './Role'
import {Binary, ObjectId} from 'bson'

export const 包钥长度 = 512

export default interface Sama {
  人设: Role
  主持: ObjectId
  包钥: Binary
}
