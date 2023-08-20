import {useState} from 'react'

export default function useAsyncState<T>() {
  const [result, setResult] = useState<T>()
  const [reason, setReason] = useState<Error>()
  const [fetching, setFetching] = useState(false)
  return {
    result,
    reason,
    fetching,
    fetch: (fetcher: () => Promise<T | undefined>) => {
      setFetching(true)
      fetcher().then(setResult).catch(setReason).finally(() => {
        setFetching(false)
      })
    },
  }
}
