import {useState} from 'react'

export default function useOpenOrClose(initialIs = false): [boolean, React.DispatchWithoutAction, React.DispatchWithoutAction] {
  const [is, setIs] = useState(initialIs)
  return [
    is,
    () => setIs(true),
    () => setIs(false),
  ]
}
