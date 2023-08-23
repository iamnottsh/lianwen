import {ClientSession, Db, MongoClient} from 'mongodb'
import getProcessEnvVar from './getProcessEnvVar'

const clientPromise = MongoClient.connect(getProcessEnvVar('MONGODB_URL'))
const dbName = getProcessEnvVar('MONGODB_DATABASE')

export default async function withTransaction<T>(handler: (db: Db, session: ClientSession) => Promise<T>) {
  return await clientPromise.then(client => new Promise<T>((resolve, reject) => client.withSession(session => session.withTransaction(() => handler(client.db(dbName), session).then(resolve))).catch(reject)))
}
