import WithBsonId from './WithBsonId'
import 主持体 from '../数据/主持体'
import {Db} from 'mongodb'

export default function collectHost(db: Db) {
  return db.collection<WithBsonId<主持体>>('楼主')
}
