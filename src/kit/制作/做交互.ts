import {向量长度} from '../数据/记录体'
import {decode, encode} from 'base65536'
import {Binary, ObjectId, serialize} from 'bson'
import {useCallback} from 'react'
import useAsyncState from '../useAsyncState'
import useSsrLocalStorage from '../useSsrLocalStorage'
import {入加解, 拆加解, 搞加密} from '../安全/加解'
import {导入拆} from '../安全/包拆'
import {搞签证} from '../安全/验签'
import 交互体 from '../数据/交互体'
import {执行POST请求} from '../网络/请求'

export default async function 做交互(控者: ObjectId, 定义: boolean, 加解: CryptoKey, 动静: string, 签: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(向量长度))
  const 表组 = new Uint8Array(await 搞加密(iv, 加解, new TextEncoder().encode(动静)))
  const 文 = serialize({控者, 记录: {定义, 向量: new Binary(iv), 表码: new Binary(表组)}} as 交互体)
  await 执行POST请求('chat', encode(文), await 搞签证(签, 文))
}

export function 使用密(包节: Uint8Array, 表节: Uint8Array) {
  const [拆节] = useSsrLocalStorage(`拆节-${encode(包节)}`)
  const [里节] = useSsrLocalStorage(`里节-${encode(表节)}`)
  return useAsyncState(useCallback(async () => {
    if (拆节 !== null) return {定义: true, 加解: await 拆加解(表节, await 导入拆(decode(拆节)))}
    if (里节 !== null) return {定义: false, 加解: await 入加解(decode(里节))}
  }, [表节, 拆节, 里节]))
}
