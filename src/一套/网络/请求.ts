import 正异 from '@/一套/网络/正异'
import {decode} from 'base65536'
import {deserialize} from 'bson'
import ky, {ResponsePromise} from 'ky'

const 执行请求 = async <T>(promise: ResponsePromise) => {
  const {结果, 原因} = deserialize(decode(await promise.text())) as 正异<T>
  if (原因) {
    const error = new Error()
    Object.assign(error, 原因)
    throw error
  }
  return 结果
}
const prefixUrl = '/api'
export const 执行GET请求 = <T>(url: string) => 执行请求<T>(ky.get(url, {prefixUrl}))
export const 执行POST请求 = <T>(url: string, 意: string, 证: string) => 执行请求<T>(ky.post(url, {prefixUrl, body: 意, headers: {Authorization: 证}}))
