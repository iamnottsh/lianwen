import {decode} from 'base65536'
import {deserialize} from 'bson'
import ky, {ResponsePromise} from 'ky'
import 正异 from './正异'

const 执行请求 = async <T>(promise: ResponsePromise): Promise<T> => {
  const {结果, 原因} = deserialize(decode(await promise.text())) as 正异<T>
  if (原因) {
    const error = new Error(原因.message)
    error.name = 原因.name
    error.stack = (原因.stack ?? '') + '\n' + (error.stack ?? '')
    throw error
  }
  return 结果
}
const prefixUrl = '/api'
export const 执行POST请求 = <T>(url: string, 意: string, 证: string) => 执行请求<T>(ky.post(url, {prefixUrl, body: 意, headers: {Authorization: 证}}))
export const 执行细分请求 = <T>(segments: string[]) => 执行请求<T>(ky.get(segments.join('/'), {prefixUrl}))
export const 执行GET请求 = <T>(url: string, searchParams: URLSearchParams) => 执行请求<T>(ky.get(url, {prefixUrl, searchParams}))
