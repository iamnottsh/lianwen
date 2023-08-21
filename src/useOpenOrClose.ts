import {useState} from 'react'

export default function useOpenOrClose(): [boolean, React.DispatchWithoutAction, React.DispatchWithoutAction] {
  const [is, setIs] = useState(false)
  return [
    is,
    () => setIs(true),
    () => setIs(false),
  ]
}
