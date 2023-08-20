'use client'

import host from '@/data/client/host'
import ky from 'ky'
import {useEffect} from 'react'

export default function Home() {
  useEffect(() => {
    host('111111111111111', '1', '少女', '', async (消息, 签名) => {
      ky.post('piazza', {prefixUrl: '/api', body: 消息, headers: {Authorization: 签名}}).then(res => res.json()).then(console.log)
    }).catch(console.error)
  }, [])
  return null
}
