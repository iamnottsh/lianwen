import {encode} from 'base65536'
import {serialize} from 'bson'
import {NextRequest, NextResponse} from 'next/server'
import {parse} from 'stack-trace'
import {验证失败} from '../安全/验签'
import 正异 from './正异'

const 响应请求 = async <T>(promise: Promise<T>): Promise<NextResponse<string>> => {
  let t: 正异<T>
  try {
    t = {结果: await promise}
  } catch (e) {
    if (e instanceof Error) {
      const {name, message} = e, frames = parse(e)
      const stack = frames.map(_ => `${_.getFunctionName() ?? ''}@${_.getFileName()}:${_.getLineNumber()}:${_.getColumnNumber()}`).join('\n')
      t = {原因: {name, message, stack}}
    } else {
      console.error(e)
      t = {原因: {name: '未知故障', message: '请联系网站管理员', stack: String(e)}}
    }
  }
  return new NextResponse(encode(serialize(t)))
}
export const 响应POST请求 = <T>(handler: (意: string, 证: string) => Promise<T>) => (request: NextRequest) => {
  const 证 = request.headers.get('Authorization')
  return 响应请求<T>(证 === null ? Promise.reject(new 验证失败('请求头中必须有Authorization字段')) : request.text().then(意 => handler(意, 证)))
}
export const 响应细分请求 = <T>(handler: (params: Partial<Record<string, string | string[]>>) => Promise<T>) => (_: NextRequest, context: any) => {
  return 响应请求<T>(handler(context.params))
}
export const 响应GET请求 = <T>(handler: (searchParams: URLSearchParams) => Promise<T>) => (request: NextRequest) => {
  return 响应请求<T>(handler(new URL(request.url).searchParams))
}

export class 数据矛盾 extends Error {
  constructor(message: string) {
    super(message)
    this.name = '数据矛盾'
  }
}
