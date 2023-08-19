import Role from './Role'
import {Binary} from 'bson'

export const 公钥长度 = 550

export default interface Host {
  人设: Role
  公钥: Binary
}
