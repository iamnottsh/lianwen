import {ObjectId} from 'bson'
import {useCallback, useEffect, useState} from 'react'
import {_id2str} from '../ObjectIdUrlSafeBase64'
import useOpenOrClose from '../useOpenOrClose'
import {Choice} from '../useSingleChoice'
import 角色头, {每页返回} from '../数据/角色头'
import {执行GET请求} from '../网络/请求'
import 列角色 from './列角色'

export default function 列主控({
  id,
  choice,
  children,
}: {
  id: string
  choice: Choice<ObjectId>
  children?: React.ReactNode
}) {
  const [data, setData] = useState<角色头[]>([])
  const [is, handleOpen, handleClose] = useOpenOrClose(true)
  const [end, setEnd] = useState(false)
  const load = useCallback((promise: Promise<void>) => {
    handleOpen()
    promise.finally(handleClose)
  }, [handleOpen, handleClose])
  const reload = useCallback(() => {
    load(执行GET请求<角色头[]>('sama', new URLSearchParams({id})).then(value => {
      setData(value)
      setEnd(value.length < 每页返回)
    }).finally(handleClose))
  }, [id, load, handleClose])
  useEffect(() => reload(), [reload])
  const before = useCallback(() => {
    if (data.length) load(执行GET请求<角色头[]>('sama', new URLSearchParams({id, before: _id2str(data[data.length - 1]._id)})).then(value => {
      setData(data.concat(value))
      setEnd(value.length < 每页返回)
    }))
    else reload()
  }, [data, id, load, reload])
  const newest = useCallback(() => {
    if (data.length) load(执行GET请求<角色头[]>('sama', new URLSearchParams({id})).then(value => {
      for (let i = 0; i < value.length; i++) if (value[i]._id.equals(data[0]._id)) return setData(value.slice(0, i).concat(data))
      setData(value)
      setEnd(value.length < 每页返回)
    }))
    else reload()
  }, [data, id, load, reload])
  return <列角色 data={data} is={is} end={end} before={before} newest={newest} choice={choice} url="sama">{children}</列角色>
}
