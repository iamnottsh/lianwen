import {Choice} from '@/kit/useSingleChoice'
import {Home} from '@mui/icons-material'
import {AccordionSummary, alpha, styled} from '@mui/material'
import {ObjectId} from 'bson'
import 角色体 from '../数据/角色体'
import 显人设 from './显人设'

const Summary = styled(AccordionSummary)(({theme}) => ({backgroundColor: alpha(theme.palette.primary.main, 0.16)}))

export default function 显主持({
  _id,
  choice,
  角色,
}: {
  _id: ObjectId
  choice: Choice<ObjectId>
  角色: 角色体
}) {
  return <显人设 _id={_id} choice={choice} 角色={角色} Summary={Summary} url=""><Home/></显人设>
}
