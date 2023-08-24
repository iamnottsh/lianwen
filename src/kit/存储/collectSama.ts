import {ObjectId} from 'bson'
import {Db} from 'mongodb'
import 主控体 from '../数据/主控体'

interface SamaDoc extends 主控体 {
  _id: ObjectId
}

export default function collectSama(db: Db) {
  return db.collection<SamaDoc>('层主')
}
