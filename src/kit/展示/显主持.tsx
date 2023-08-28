import 显人设 from './显人设'
import 角色体 from '../数据/角色体'
import {Home} from '@mui/icons-material'
import {AccordionSummary, alpha, styled} from '@mui/material'
import {ObjectId} from 'bson'

const Summary = styled(AccordionSummary)(({theme}) => ({backgroundColor: alpha(theme.palette.primary.main, 0.16)}))

export default function 显主持({
  _id,
  角色,
  展开,
}: {
  _id: ObjectId
  角色: 角色体
  展开: [boolean, React.Dispatch<boolean>]
}) {
  return <显人设 _id={_id} 角色={角色} 展开={展开} Summary={Summary} url=""><Home/></显人设>
}
