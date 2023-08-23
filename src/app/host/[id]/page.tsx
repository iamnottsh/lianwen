'use client'

import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import {给主持} from '@/kit/制作/做主持'
import 编主控 from '@/kit/填写/编主控'
import 容器 from '@/kit/容器'
import 报错 from '@/kit/报错'
import 主持体 from '@/kit/数据/主持体'
import {执行细分请求} from '@/kit/网络/请求'
import {LinearProgress} from '@mui/material'
import useSWR from 'swr'

export default function Page({params: {id}}: {params: {id: string}}) {
  const _id = str2_id(id)
  return (
    <容器 component="main">
      <Main id={id}/>
    </容器>
  )
}

function Main({
  id,
}: {
  id: string
}) {
  const {data, error, mutate} = useSWR(['host', id], key => 执行细分请求<主持体>(key).then(给主持))
  if (error) return <报错 错误={error} 关闭={mutate}/>
  if (!data) return <LinearProgress/>
  const _id = str2_id(id), {角色, 包} = data
  return <编主控 持者={_id} 包={包}/>
}
