import {_id2str} from '../ObjectIdUrlSafeBase64'
import 显人设 from './显人设'
import 角色体 from '../数据/角色体'
import {ArrowBack} from '@mui/icons-material'
import {AccordionSummary, alpha, styled} from '@mui/material'
import {ObjectId} from 'bson'

const Summary = styled(AccordionSummary)(({theme}) => ({backgroundColor: alpha(theme.palette.secondary.main, 0.16)}))

export default function 显主控({
  _id,
  角色,
  展开,
  持者,
}: {
  _id: ObjectId
  角色: 角色体
  展开: [boolean, React.Dispatch<boolean>]
  持者: ObjectId
}) {
  return <显人设 _id={_id} 角色={角色} 展开={展开} Summary={Summary} url={`host/${_id2str(持者)}`}><ArrowBack/></显人设>
}
