import {_id2str} from '../ObjectIdUrlSafeBase64'
import {Choice} from '../useSingleChoice'
import 列人设 from './列人设'
import 显角色 from './显角色'
import 角色头 from '../数据/角色头'
import {ObjectId} from 'bson'

export default function 列角色({
  data,
  is,
  end,
  before,
  newest,
  choice,
  url,
  children,
}: {
  data: 角色头[]
  is: boolean
  end: boolean
  before: React.DispatchWithoutAction
  newest: React.DispatchWithoutAction
  choice: Choice<ObjectId>
  url: string
  children?: React.ReactNode
}) {
  return (
    <列人设 is={is} end={end} before={before} newest={newest}>
      {children}
      {data.slice().reverse().map(({角色, _id}) => {
        const id = _id2str(_id)
        return <显角色 key={id} 角色={角色} 展开={choice(_id)} url={`${url}/${id}`}/>
      })}
    </列人设>
  )
}
