import {ObjectId} from 'bson'

export function _id2str(_id: ObjectId) {
  return _id.id.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function str2_id(str: string) {
  return new ObjectId(Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/') + Array(5 - str.length & 3).join('='), 'base64'))
}
