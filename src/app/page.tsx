'use client'

import useSingleChoice from '@/kit/useSingleChoice'
import 编主持 from '@/kit/填写/编主持'
import 容器 from '@/kit/容器'
import 主持聊 from '@/kit/展示/主持聊'
import 主控聊 from '@/kit/展示/主控聊'
import 列主持 from '@/kit/展示/列主持'
import 自己聊 from '@/kit/展示/自己聊'
import {List} from '@mui/material'
import {ObjectId} from 'bson'

export default function Page() {
  return <Main/>
}

function Main() {
  return (
    <容器 component="main">
      <List>
        <主持聊 primary="你好1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"/>
        <自己聊 primary="世界2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"/>
        <主控聊 primary="你好1111111111111111111"/>
      </List>
      <列主持 choice={useSingleChoice<ObjectId>(undefined, (x, y) => x.equals(y))}/>
      <编主持/>
    </容器>
  )
}
