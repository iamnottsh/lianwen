import {useEffect, useState} from 'react'

export default function useAsyncState<T>(fetcher: () => Promise<T | undefined>): T | undefined {
  const [data, setData] = useState<T>()
  useEffect(() => {
    fetcher().then(setData)
  }, [fetcher, setData])
  return data
}
