import useAsyncState from '@/useAsyncState'
import useSsrLocalStorage from '@/useSsrLocalStorage'
import {入加解, 拆加解, 搞加密, 搞解密} from '@/安全/加解'
import {导入拆} from '@/安全/包拆'
import {搞签证} from '@/安全/验签'
import {交互体, 向量长度} from '@/数据/交互'
import {decode, encode} from 'base65536'
import {Binary, ObjectId, serialize} from 'bson'
import {useEffect} from 'react'

export async function 做交互(控者: ObjectId, 定义: boolean, 加解: CryptoKey, 动静: string, 签: CryptoKey, 送出: (意: string, 证: string) => Promise<void>): Promise<void> {
  const iv = crypto.getRandomValues(new Uint8Array(向量长度))
  const 表组 = new Uint8Array(await 搞加密(iv, 加解, new TextEncoder().encode(动静)))
  const 文 = serialize({控者, 定义, 向量: new Binary(iv), 表码: new Binary(表组)} as 交互体)
  await 送出(encode(文), await 搞签证(签, 文))
}

export async function 给交互({控者, 向量, 定义, 表码}: 交互体, 加解: CryptoKey) {
  return {控者, 定义, 动静: await 搞解密(向量.buffer, 加解, 表码.buffer)}
}

export function 使用密(表钥: Uint8Array, 包节: Uint8Array, 表节: Uint8Array) {
  const [拆节] = useSsrLocalStorage(`拆节-${encode(包节)}`)
  const [里节] = useSsrLocalStorage(`里节-${encode(表节)}`)
  const {result, reason, fetching, fetch} = useAsyncState<{加解: CryptoKey, 定义: boolean}>()
  useEffect(() => {
    fetch(async () => {
      if (拆节 !== null) return {加解: await 拆加解(表钥, await 导入拆(decode(拆节))), 定义: true}
      if (里节 !== null) return {加解: await 入加解(decode(里节)), 定义: false}
    })
  }, [里节, 拆节])
  return {result, reason, fetching}
}
