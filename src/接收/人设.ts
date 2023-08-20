// import {导入验, 搞验证} from '@/安全/验签'
// import {人设体, 情节最短, 情节最长, 真名最短, 真名最长, 萌差选项, 补充最长, 验据长度} from '@/数据/人设'
// import {decode} from 'base65536'
// import {Binary, deserialize, Document} from 'bson'
//
// export class 格式错误 extends Error {
//   constructor(message: string) {
//     super(message)
//     this.name = '格式错误'
//   }
// }
//
// export async function* 领人设<T extends Document>(意: string, 证: string): AsyncGenerator<Record<keyof T, any> | void, void, void | Record<keyof 人设体, any>> {
//   const 文 = decode(意)
//   yield deserialize(文) as Record<keyof T, any>
//   const {情节, 真名, 萌差, 补充, 验据} = (yield) as Record<keyof 人设体, any>
//   if (typeof 情节 !== 'string') throw new 格式错误(`人设中的情节必须是字符串`)
//   if (情节.length < 情节最短) throw new 格式错误(`人设中的情节不得短于${情节最短}个字`)
//   if (情节.length > 情节最长) throw new 格式错误(`人设中的情节不得长于${情节最长}个字`)
//   if (typeof 真名 !== 'string') throw new 格式错误(`人设中的真名必须是字符串`)
//   if (真名.length < 真名最短) throw new 格式错误(`人设中的真名不得短于${真名最短}个字`)
//   if (真名.length > 真名最长) throw new 格式错误(`人设中的真名不得长于${真名最长}个字`)
//   if (typeof 萌差 !== 'string') throw new 格式错误(`人设中的萌差必须是字符串`)
//   if (!萌差选项.includes(萌差)) throw new 格式错误(`人设中的萌差必须属于{${萌差选项.join()}}`)
//   if (typeof 补充 !== 'string') throw new 格式错误(`人设中的补充必须是字符串`)
//   if (补充.length > 补充最长) throw new 格式错误(`人设中的补充不得长于${补充最长}个字`)
//   if (!(验据 instanceof Binary)) throw new 格式错误(`人设中的验据必须是二进制`)
//   if (验据.length() !== 验据长度) throw new 格式错误(`人设中的验据长度必须恰为${验据长度}`)
//   await 搞验证(await 导入验(验据.buffer), 证, 文)
// }
