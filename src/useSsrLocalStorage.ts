import react, {useCallback, useEffect} from 'react'

export default function useSsrLocalStorage(key: string, ssr: string | null = null): [string | null, React.Dispatch<string>, React.DispatchWithoutAction] {
  const [value, setValue] = react.useState<string | null>(ssr)
  useEffect(() => {
    setValue(typeof window === 'undefined' ? null : window.localStorage.getItem(key))
  }, [key, setValue])
  const handleStorage = useCallback((event: WindowEventMap['storage']) => {
    if (event.key === key) setValue(event.newValue)
  }, [key, setValue])
  react.useEffect(() => {
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [handleStorage])
  return [
    value,
    useCallback(newValue => {
      setValue(newValue)
      window.localStorage.setItem(key, newValue)
    }, [key, setValue]),
    useCallback(() => {
      setValue(null)
      window.localStorage.removeItem(key)
    }, [key, setValue]),
  ]
}
