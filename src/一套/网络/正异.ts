interface 正常<T> {
  结果: T
  原因?: never
}

interface 异常 {
  结果?: never
  原因: {
    name: string
    message: string
    stack?: string
  }
}

type 正异<T> = 正常<T> | 异常

export default 正异
