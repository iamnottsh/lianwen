import 人设体 from '../数据/人设体'
import 人设头 from '../数据/人设头'

export default function 给人设({角色, 验据}: 人设体): 人设头 {
  return {角色, 验节: 验据.buffer}
}
