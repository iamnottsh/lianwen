import {Db} from 'mongodb'
import 主控体 from '../数据/主控体'
import WithBsonId from './WithBsonId'

export default function collectSama(db: Db) {
  return db.collection<WithBsonId<主控体>>('层主')
}
