import {useState} from 'react'

export default function useSingleChoice<T>(initialData: T, equals: (x: T, y: T) => boolean): (currentData: T) => [boolean, React.Dispatch<boolean>] {
  const [data, setData] = useState<T | undefined>(initialData)
  return currentData => [data !== undefined && equals(currentData, data), value => setData(value ? currentData : undefined)]
}
