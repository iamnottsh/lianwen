import {Db} from 'mongodb'
import 主持体 from '../数据/主持体'
import WithBsonId from './WithBsonId'

export default function collectHost(db: Db) {
  return db.collection<WithBsonId<主持体>>('楼主')
}
