import {ObjectId} from 'bson'
import {useEffect, useState} from 'react'
import {_id2str} from '../ObjectIdUrlSafeBase64'
import useOpenOrClose from '../useOpenOrClose'
import {Choice} from '../useSingleChoice'
import 列角色 from '../展示/列角色'
import 角色头, {每页返回} from '../数据/角色头'
import {执行GET请求} from '../网络/请求'

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
  const [is, open, close] = useOpenOrClose(true)
  const [end, setEnd] = useState(false)
  const load = (promise: Promise<void>) => {
    open()
    promise.finally(close)
  }
  const reload = () => {
    load(执行GET请求<角色头[]>('sama', new URLSearchParams({id})).then(value => {
      setData(value)
      setEnd(value.length < 每页返回)
    }).finally(close))
  }
  useEffect(reload, [])
  const before = () => {
    if (data.length) load(执行GET请求<角色头[]>('sama', new URLSearchParams({id, before: _id2str(data[data.length - 1]._id)})).then(value => {
      setData(data.concat(value))
      setEnd(value.length < 每页返回)
    }))
    else reload()
  }
  const newest = () => {
    if (data.length) load(执行GET请求<角色头[]>('sama', new URLSearchParams({id})).then(value => {
      for (let i = 0; i < value.length; i++) if (value[i]._id.equals(data[0]._id)) return setData(value.slice(0, i).concat(data.slice(i)))
      setData(value)
      setEnd(value.length < 每页返回)
    }))
    else reload()
  }
  return <列角色 data={data} is={is} end={end} before={before} newest={newest} choice={choice} url="sama">{children}</列角色>
}
