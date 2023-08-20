import useAsyncState from '@/useAsyncState'
import useSsrLocalStorage from '@/useSsrLocalStorage'
import {导入签, 导入验, 导出签, 导出验, 搞签证, 造验签} from '@/安全/验签'
import {人设体} from '@/数据/人设'
import {decode, encode} from 'base65536'
import {Binary, Document, serialize} from 'bson'
import {useEffect} from 'react'

export async function* 做人设<T extends Document>(情节: string, 真名: string, 萌差: string, 补充: string, 送出: (意: string, 证: string) => Promise<void>): AsyncGenerator<人设体 | void, void, void | T> {
  const {publicKey: 验, privateKey: 签} = await 造验签()
  const 验节 = new Uint8Array(await 导出验(验)), 签节 = new Uint8Array(await 导出签(签))
  yield {情节, 真名, 萌差, 补充, 验据: new Binary(验节)}
  const 文 = serialize((yield) as T)
  await 送出(encode(文), await 搞签证(签, 文))
  localStorage.setItem(`签节-${encode(验节)}`, encode(签节))
}

export async function 给人设({情节, 真名, 萌差, 补充, 验据}: 人设体) {
  return {情节, 真名, 萌差, 补充, 验: await 导入验(验据.buffer)}
}

export function 使用签(验节: Uint8Array) {
  const [签节] = useSsrLocalStorage(`签节-${encode(验节)}`)
  const {result, reason, fetching, fetch} = useAsyncState<CryptoKey>()
  useEffect(() => {
    fetch(async () => {
      if (签节 !== null) return await 导入签(decode(签节))
    })
  }, [签节])
  return {result, reason, fetching}
}
