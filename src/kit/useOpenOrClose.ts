import {useCallback, useState} from 'react'

export default function useOpenOrClose(initialIs = false): [boolean, React.DispatchWithoutAction, React.DispatchWithoutAction] {
  const [is, setIs] = useState(initialIs)
  return [
    is,
    useCallback(() => setIs(true), []),
    useCallback(() => setIs(false), []),
  ]
}
