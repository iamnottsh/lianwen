import {CircularProgress, List} from '@mui/material'
import {ObjectId} from 'bson'
import {useCallback, useEffect, useState} from 'react'
import {_id2str} from '../ObjectIdUrlSafeBase64'
import useAsyncState from '../useAsyncState'
import useOpenOrClose from '../useOpenOrClose'
import {搞解密} from '../安全/加解'
import 交互头, {单次返回} from '../数据/交互头'
import 记录体 from '../数据/记录体'
import {执行GET请求} from '../网络/请求'
import 主持聊 from './主持聊'
import 主控聊 from './主控聊'
import 列人设 from './列人设'
import 自己聊 from './自己聊'

export default function 列交互({
  id,
  定义,
  加解,
}: {
  id: string
  定义: boolean
  加解: CryptoKey
}) {
  const [data, setData] = useState<交互头[]>([])
  const [is, handleOpen, handleClose] = useOpenOrClose(true)
  const [end, setEnd] = useState(false)
  const load = useCallback((promise: Promise<void>) => {
    handleOpen()
    promise.finally(handleClose)
  }, [handleOpen, handleClose])
  const reload = useCallback(() => {
    load(执行GET请求<交互头[]>('chat', new URLSearchParams({id})).then(value => {
      setData(value)
      setEnd(value.length < 单次返回)
    }).finally(handleClose))
  }, [id, load, handleClose])
  useEffect(() => reload(), [reload])
  const before = useCallback(() => {
    if (data.length) load(执行GET请求<交互头[]>('chat', new URLSearchParams({id, before: _id2str(data[data.length - 1]._id)})).then(value => {
      setData(data.concat(value))
      setEnd(value.length < 单次返回)
    }))
    else reload()
  }, [data, id, load, reload])
  const newest = useCallback(() => {
    if (data.length) load(执行GET请求<交互头[]>('chat', new URLSearchParams({id})).then(value => {
      for (let i = 0; i < value.length; i++) if (value[i]._id.equals(data[0]._id)) return setData(value.slice(0, i).concat(data))
      setData(value)
      setEnd(value.length < 单次返回)
    }))
    else reload()
  }, [data, id, load, reload])
  useEffect(() => {
    addEventListener('送出交互', newest)
    return () => removeEventListener('送出交互', newest)
  }, [newest])
  return (
    <列人设 is={is} end={end} before={before} newest={newest}>
      <List>{data.toReversed().map(({记录, _id}) => <Item key={_id2str(_id)} _id={_id} 定义={定义} 加解={加解} 记录={记录}/>)}</List>
    </列人设>
  )
}

function Item({
  _id,
  定义,
  加解,
  记录,
}: {
  _id: ObjectId
  定义: boolean
  加解: CryptoKey
  记录: 记录体
}) {
  const 动静 = useAsyncState(useCallback(async () => {
    const 里文 = await 搞解密(记录.向量.buffer, 加解, 记录.表码.buffer)
    return new TextDecoder().decode(里文)
  }, [记录, 加解])) ?? <CircularProgress/>
  return 定义 === 记录.定义 ? <自己聊 _id={_id} 动静={动静}/> : 定义 ? <主控聊 _id={_id} 动静={动静}/> : <主持聊 _id={_id} 动静={动静}/>
}
