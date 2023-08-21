const 验签法 = {name: 'ECDSA'}
const 验签参 = {...验签法, hash: 'SHA-512'}
const 验签生 = {...验签法, namedCurve: 'P-521'}

export const 造验签 = () => crypto.subtle.generateKey(验签生, true, ['sign', 'verify'])
export const 导出验 = (验: CryptoKey) => crypto.subtle.exportKey('spki', 验)
export const 导入验 = (验钥: BufferSource) => crypto.subtle.importKey('spki', 验钥, 验签参, false, ['verify'])
export const 导出签 = (签: CryptoKey) => crypto.subtle.exportKey('pkcs8', 签)
export const 导入签 = (签钥: BufferSource) => crypto.subtle.importKey('pkcs8', 签钥, 验签参, false, ['sign'])
export const 搞验证 = (验: CryptoKey, 证: string, 文: BufferSource) => crypto.subtle.verify(验签参, 验, Buffer.from(证, 'base64'), 文).then(测试)
export const 搞签证 = (签: CryptoKey, 文: BufferSource) => crypto.subtle.sign(验签参, 签, 文).then(Buffer.from).then(value => value.toString('base64'))

function 测试(value: boolean) {
  if (!value) {
    const error = new Error(`身份被假冒或者数据被篡改`)
    error.name = '验证失败'
    throw error
  }
}
