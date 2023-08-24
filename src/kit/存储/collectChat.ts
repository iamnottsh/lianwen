import {Db} from 'mongodb'
import 交互体 from '../数据/交互体'
import WithBsonId from './WithBsonId'

export default function collectChat(db: Db) {
  return db.collection<WithBsonId<交互体>>('回复')
}
