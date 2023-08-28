'use client'

import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import useSingleChoice from '@/kit/useSingleChoice'
import 给楼主 from '@/kit/制作/给楼主'
import 编主控 from '@/kit/填写/编主控'
import 容器 from '@/kit/容器'
import 列主控 from '@/kit/展示/列主控'
import 显主持 from '@/kit/展示/显主持'
import 报错 from '@/kit/报错'
import 楼主头 from '@/kit/数据/楼主头'
import 角色体 from '@/kit/数据/角色体'
import {执行细分请求} from '@/kit/网络/请求'
import {LinearProgress} from '@mui/material'
import useSWR from 'swr'

export default function Page({params: {id}}: {params: {id: string}}) {
  const {data, error, mutate} = useSWR(['host', id], key => 执行细分请求<楼主头>(key).then(给楼主))
  if (error) return <报错 错误={error} 关闭={mutate}/>
  if (!data) return <LinearProgress/>
  const {角色, 包} = data
  return <Main id={id} 角色={角色} 包={包}/>
}

function Main({
  id,
  角色,
  包,
}: {
  id: string
  角色: 角色体
  包: CryptoKey
}) {
  const 持者 = str2_id(id), choice = useSingleChoice(持者, (x, y) => x.equals(y))
  return (
    <容器 component="main">
      <列主控 choice={choice} id={id}>
        <显主持 _id={持者} choice={choice} 角色={角色}/>
      </列主控>
      <编主控 持者={持者} 包={包}/>
    </容器>
  )
}
