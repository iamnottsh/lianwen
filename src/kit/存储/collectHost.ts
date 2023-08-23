import 主持体 from '../数据/主持体'
import {ObjectId} from 'bson'
import {Db} from 'mongodb'

interface HostDoc extends 主持体 {
  _id: ObjectId
}

export default function collectHost(db: Db) {
  return db.collection<HostDoc>('host')
}
