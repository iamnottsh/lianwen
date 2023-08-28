import {Choice} from '@/kit/useSingleChoice'
import {QuestionAnswer} from '@mui/icons-material'
import {AccordionSummary} from '@mui/material'
import {ObjectId} from 'bson'
import 角色体 from '../数据/角色体'
import 显人设 from './显人设'

export default function 显角色({
  _id,
  choice,
  角色,
  url,
}: {
  _id: ObjectId
  choice: Choice<ObjectId>
  角色: 角色体
  url: string
}) {
  return <显人设 _id={_id} choice={choice} 角色={角色} Summary={AccordionSummary} url={url}><QuestionAnswer/></显人设>
}
