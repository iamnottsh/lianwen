import {Binary, ObjectId} from 'bson'
import Sama, {包钥长度} from '../common/Sama'
import tragic, {格式错误} from './tragic'

export default tragic<Sama>(async ({人设, 主持, 包钥}, checker) => {
  if (!(人设 instanceof Object)) throw new 格式错误(`主控中必须用人设记录字段`)
  await checker(人设)
  if (!(主持 instanceof ObjectId)) throw new 格式错误(`主控中的主持必须是标识符`)
  if (!(包钥 instanceof Binary)) throw new 格式错误(`主控中的包钥必须是二进制`)
  if (包钥.length() !== 包钥长度) throw new 格式错误(`主控中的包钥长度必须恰为${包钥长度}`)
})
