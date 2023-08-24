import {包拆法} from './包拆'

const 加解法 = {name: 'AES-GCM'}
const 加解器 = {...加解法, length: 256}
const 加解算 = (iv: Uint8Array) => ({...加解法, iv})

export const 造加解 = () => crypto.subtle.generateKey(加解器, true, ['encrypt', 'decrypt'])
export const 出加解 = (加解: CryptoKey) => crypto.subtle.exportKey('raw', 加解)
export const 入加解 = (里钥: BufferSource) => crypto.subtle.importKey('raw', 里钥, 加解器, false, ['encrypt', 'decrypt'])
export const 包加解 = (加解: CryptoKey, 包: CryptoKey) => crypto.subtle.wrapKey('raw', 加解, 包, 包拆法)
export const 拆加解 = (表节: BufferSource, 拆: CryptoKey) => crypto.subtle.unwrapKey('raw', 表节, 拆, 包拆法, 加解法, false, ['encrypt', 'decrypt'])
export const 搞加密 = (iv: Uint8Array, 加解: CryptoKey, 里文: BufferSource) => crypto.subtle.encrypt(加解算(iv), 加解, 里文)
export const 搞解密 = (iv: Uint8Array, 加解: CryptoKey, 表文: BufferSource) => crypto.subtle.decrypt(加解算(iv), 加解, 表文)
