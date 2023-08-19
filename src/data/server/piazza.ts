import {Binary} from 'bson'
import {rsaAlgorithm} from '../client/sama'
import Host, {公钥长度} from '../common/Host'
import tragic, {格式错误} from './tragic'

export default tragic<Host>(async ({人设, 公钥}, checker) => {
  if (!(人设 instanceof Object)) throw new 格式错误(`主持中必须用人设记录字段`)
  await checker(人设)
  if (!(公钥 instanceof Binary)) throw new 格式错误(`主持中的公钥必须是二进制`)
  if (公钥.length() !== 公钥长度) throw new 格式错误(`主持中的公钥长度必须恰为${公钥长度}`)
  try {
    await crypto.subtle.importKey('spki', 公钥.buffer, rsaAlgorithm, false, ['wrapKey'])
  } catch {
    throw new 格式错误(`主持中的公钥必须能被导入`)
  }
})
