import {useState} from 'react'

export default function useOpenOrClose(): [boolean, React.DispatchWithoutAction, React.DispatchWithoutAction] {
  const [open, setOpen] = useState(false)
  return [
    open,
    () => setOpen(true),
    () => setOpen(false),
  ]
}
