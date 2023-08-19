'use client'

import host from '@/data/client/host'
import {useEffect} from 'react'

export default function Home() {
  useEffect(() => {
    host('', '', '', '', async (消息, 签名) => {
      console.log(消息)
    }).catch(console.error)
  }, [])
  return null
}
