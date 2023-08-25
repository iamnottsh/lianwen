import {_id2str} from '@/kit/ObjectIdUrlSafeBase64'
import {Choice} from '@/kit/useSingleChoice'
import 列角色 from '@/kit/展示/列角色'
import {ObjectId} from 'bson'
import {useEffect, useState} from 'react'
import useOpenOrClose from '../useOpenOrClose'
import 角色头 from '../数据/角色头'
import {执行GET请求} from '../网络/请求'

export default function 列主持({
  choice,
  children,
}: {
  choice: Choice<ObjectId>
  children?: React.ReactNode
}) {
  const [data, setData] = useState<角色头[]>([])
  const [is, open, close] = useOpenOrClose()
  const load = (promise: Promise<void>) => {
    open()
    promise.finally(close)
  }
  const reload = () => load(执行GET请求<角色头[]>('host', new URLSearchParams()).then(setData).finally(close))
  useEffect(reload, [])
  const before = () => {
    if (data.length) load(执行GET请求<角色头[]>('host', new URLSearchParams({before: _id2str(data[0]._id)})).then(value => setData(data.concat(value))))
    else reload()
  }
  const newest = () => {
    if (data.length) load(执行GET请求<角色头[]>('host', new URLSearchParams()).then(value => {
      for (let i = 0; i < value.length; i++) if (value[i]._id.equals(data[0]._id)) return setData(value.slice(0, i).concat(data.slice(i)))
      setData(value)
    }))
    else reload()
  }
  return <列角色 data={data} is={is} before={before} newest={newest} choice={choice} url="host">{children}</列角色>
}
