import 主控体 from '../数据/主控体'
import 给人设 from './给人设'

export default function 给主控({人设, 持者, 表据}: 主控体) {
  return {信息: 给人设(人设), 持者, 表节: 表据.buffer}
}
