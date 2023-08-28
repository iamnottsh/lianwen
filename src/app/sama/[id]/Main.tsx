'use client'

import {str2_id} from '@/kit/ObjectIdUrlSafeBase64'
import useSingleChoice from '@/kit/useSingleChoice'
import {使用密} from '@/kit/制作/做交互'
import {使用签} from '@/kit/制作/做人设'
import 给层主 from '@/kit/制作/给层主'
import 编交互 from '@/kit/填写/编交互'
import 容器 from '@/kit/容器'
import 列交互 from '@/kit/展示/列交互'
import 显主持 from '@/kit/展示/显主持'
import 显主控 from '@/kit/展示/显主控'
import 报错 from '@/kit/报错'
import 人设头 from '@/kit/数据/人设头'
import 层主头 from '@/kit/数据/层主头'
import {执行细分请求} from '@/kit/网络/请求'
import title from '@/title'
import {LinearProgress} from '@mui/material'
import {ObjectId} from 'bson'
import {useEffect} from 'react'
import useSWR from 'swr'

export default function Main({params: {id}}: {params: {id: string}}) {
  const {data, error, mutate} = useSWR(['sama', id], key => 执行细分请求<层主头>(key).then(给层主))
  if (error) return <报错 错误={error} 关闭={mutate}/>
  if (!data) return <LinearProgress/>
  const {楼主: {信息: 楼主, 包节}, 层主: {信息: 层主, 持者, 表节}} = data
  return <Content id={id} 楼主={楼主} 包节={包节} 层主={层主} 持者={持者} 表节={表节}/>
}

function Content({
  id,
  楼主,
  包节,
  层主,
  持者,
  表节,
}: {
  id: string
  楼主: 人设头
  包节: Uint8Array
  层主: 人设头
  持者: ObjectId
  表节: Uint8Array
}) {
  useEffect(() => {
    document.title = `${层主.角色.真名}#${title}`
  }, [层主])
  const 控者 = str2_id(id), choice = useSingleChoice(控者, (x, y) => x.equals(y))
  const 密 = 使用密(包节, 表节)
  return (
    <容器 component="main">
      <显主持 _id={持者} choice={choice} 角色={楼主.角色}/>
      <显主控 _id={控者} choice={choice} 角色={层主.角色} 持者={持者}/>
      {密 &&
        <>
          <列交互 id={id} {...密}/>
          <Footer 控者={控者} {...密} 验节={密.定义 ? 楼主.验节 : 层主.验节}/>
        </>
      }
    </容器>
  )
}

function Footer({
  控者,
  定义,
  加解,
  验节,
}: {
  控者: ObjectId
  定义: boolean
  加解: CryptoKey
  验节: Uint8Array
}) {
  const 签 = 使用签(验节)
  return 签 && <编交互 控者={控者} 定义={定义} 加解={加解} 签={签}/>
}
