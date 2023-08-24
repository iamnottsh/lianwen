import 层主头 from '../数据/层主头'
import 给主持 from './给主持'
import 给主控 from './给主控'


export default function 给层主({主持, 主控}: 层主头) {
  return {楼主: 给主持(主持), 层主: 给主控(主控)}
}
