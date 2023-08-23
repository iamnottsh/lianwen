import {ObjectId} from 'bson'
import 做主控 from '../制作/做主控'
import 编人设 from './编人设'

export default function 编主控({
  持者,
  包,
}: {
  持者: ObjectId
  包: CryptoKey
}) {
  return <编人设 title="扮演主控" 送出={做主控(持者, 包)}/>
}
