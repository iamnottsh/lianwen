import 主持体 from '../数据/主持体'
import 给人设 from './给人设'

export default function 给主持({人设, 包据}: 主持体) {
  return {信息: 给人设(人设), 包节: 包据.buffer}
}
