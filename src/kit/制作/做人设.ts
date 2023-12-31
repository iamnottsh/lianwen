import {decode, encode} from 'base65536'
import {Binary, Document, ObjectId, serialize} from 'bson'
import {useCallback} from 'react'
import useAsyncState from '../useAsyncState'
import useSsrLocalStorage from '../useSsrLocalStorage'
import {导入签, 导出签, 导出验, 搞签证, 造验签} from '../安全/验签'
import 人设体 from '../数据/人设体'
import 角色体 from '../数据/角色体'
import {执行POST请求} from '../网络/请求'

export default async function* 做人设<T extends Document>(角色: 角色体, url: string): AsyncGenerator<人设体 | void, ObjectId, void | T> {
  const {publicKey: 验, privateKey: 签} = await 造验签()
  const 验节 = new Uint8Array(await 导出验(验)), 签节 = new Uint8Array(await 导出签(签))
  const 文 = serialize((yield {角色, 验据: new Binary(验节)}) as T)
  const _id = await 执行POST请求<ObjectId>(url, encode(文), await 搞签证(签, 文))
  localStorage.setItem(`签节-${encode(验节)}`, encode(签节))
  return _id
}

export function 使用签(验节: Uint8Array) {
  const [签节] = useSsrLocalStorage(`签节-${encode(验节)}`)
  return useAsyncState(useCallback(async () => {
    if (签节 !== null) return await 导入签(decode(签节))
  }, [签节]))
}
