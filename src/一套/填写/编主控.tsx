import 做主控 from '@/一套/制作/做主控'
import 编人设 from '@/一套/填写/编人设'
import {ObjectId} from 'bson'

export default function 编主控({
  持者,
  包,
}: {
  持者: ObjectId
  包: CryptoKey
}) {
  return <编人设 title="扮演主控" 送出={做主控(持者, 包)}/>
}
