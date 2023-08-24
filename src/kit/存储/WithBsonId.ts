import {ObjectId} from 'bson'

type WithBsonId<T> = T & {_id: ObjectId}
export default WithBsonId
