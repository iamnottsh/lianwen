import {useState} from 'react'

export type Choice<T> = (currentData: T) => [boolean, React.Dispatch<boolean>]

export default function useSingleChoice<T>(initialData: T | undefined, equals: (x: T, y: T) => boolean): Choice<T> {
  const [data, setData] = useState<T | undefined>(initialData)
  return currentData => [data !== undefined && equals(currentData, data), value => setData(value ? currentData : undefined)]
}
