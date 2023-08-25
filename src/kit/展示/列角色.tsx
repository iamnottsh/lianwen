import {_id2str} from '@/kit/ObjectIdUrlSafeBase64'
import {Choice} from '@/kit/useSingleChoice'
import 显角色 from '@/kit/展示/显角色'
import 角色头 from '@/kit/数据/角色头'
import {ObjectId} from 'bson'

export default function 列角色({
  data,
  is,
  before,
  newest,
  choice,
  url,
  children,
}: {
  data: 角色头[]
  is: boolean
  before: React.DispatchWithoutAction
  newest: React.DispatchWithoutAction
  choice: Choice<ObjectId>
  url: string
  children?: React.ReactNode
}) {
  return (
    <>
      {children}
      {data.slice().reverse().map(({角色, _id}) => {
        const id = _id2str(_id)
        return <显角色 key={id} 角色={角色} 展开={choice(_id)} url={`${url}/${id}`}/>
      })}
    </>
  )
}
