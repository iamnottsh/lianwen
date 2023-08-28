import {Choice} from '@/kit/useSingleChoice'
import {ArrowBack} from '@mui/icons-material'
import {AccordionSummary, alpha, styled} from '@mui/material'
import {ObjectId} from 'bson'
import {_id2str} from '../ObjectIdUrlSafeBase64'
import 角色体 from '../数据/角色体'
import 显人设 from './显人设'

const Summary = styled(AccordionSummary)(({theme}) => ({backgroundColor: alpha(theme.palette.secondary.main, 0.16)}))

export default function 显主控({
  _id,
  choice,
  角色,
  持者,
}: {
  _id: ObjectId
  choice: Choice<ObjectId>
  角色: 角色体
  持者: ObjectId
}) {
  return <显人设 _id={_id} choice={choice} 角色={角色} Summary={Summary} url={`host/${_id2str(持者)}`}><ArrowBack/></显人设>
}
