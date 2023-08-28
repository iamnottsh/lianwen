import 显人设 from './显人设'
import 角色体 from '../数据/角色体'
import {QuestionAnswer} from '@mui/icons-material'
import {AccordionSummary} from '@mui/material'
import {ObjectId} from 'bson'

export default function 显角色({
  _id,
  角色,
  展开,
  url,
}: {
  _id: ObjectId
  角色: 角色体
  展开: [boolean, React.Dispatch<boolean>]
  url: string
}) {
  return <显人设 _id={_id} 角色={角色} 展开={展开} Summary={AccordionSummary} url={url}><QuestionAnswer/></显人设>
}
