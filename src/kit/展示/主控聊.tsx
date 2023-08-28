import {alpha, Paper, styled} from '@mui/material'
import {ObjectId} from 'bson'
import 对方聊 from './对方聊'

const Pa = styled(Paper)(({theme}) => ({backgroundColor: alpha(theme.palette.secondary.main, 0.2)}))

export default function 主控聊({
  _id,
  动静,
}: {
  _id: ObjectId
  动静?: React.ReactNode
}) {
  return <对方聊 _id={_id} 动静={动静} Pa={Pa}/>
}
