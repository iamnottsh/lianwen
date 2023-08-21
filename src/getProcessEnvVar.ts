export default function getProcessEnvVar(key: string) {
  const value = process.env[key]
  if (value !== undefined) return value
  const error = new Error(key)
  error.name = '环境缺失'
  throw error
}
