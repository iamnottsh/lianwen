export const 包拆法 = {name: 'RSA-OAEP'}
const 包拆参 = {...包拆法, hash: 'SHA-512'}
const 包拆生 = {...包拆参, modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1])}

export const 造包拆 = () => crypto.subtle.generateKey(包拆生, true, ['wrapKey', 'unwrapKey'])
export const 导出包 = (包: CryptoKey) => crypto.subtle.exportKey('spki', 包)
export const 导入包 = (包钥: BufferSource) => crypto.subtle.importKey('spki', 包钥, 包拆参, false, ['wrapKey'])
export const 导出拆 = (拆: CryptoKey) => crypto.subtle.exportKey('pkcs8', 拆)
export const 导入拆 = (拆钥: BufferSource) => crypto.subtle.importKey('pkcs8', 拆钥, 包拆参, false, ['unwrapKey'])
