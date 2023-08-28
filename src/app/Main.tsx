'use client'

import useSingleChoice from '@/kit/useSingleChoice'
import 编主持 from '@/kit/填写/编主持'
import 容器 from '@/kit/容器'
import 列主持 from '@/kit/展示/列主持'
import {title} from '@/config'
import {ObjectId} from 'bson'
import {useEffect} from 'react'

export default function Main() {
  return <Content/>
}

export function Content() {
  useEffect(() => {
    document.title = `首页_${title}`
  }, [])
  return (
    <容器 component="main">
      <列主持 choice={useSingleChoice<ObjectId>(undefined, (x, y) => x.equals(y))}/>
      <编主持/>
    </容器>
  )
}
