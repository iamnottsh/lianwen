import {ListItemText} from '@mui/material'
import {ObjectId} from 'bson'
import 查信息 from './查信息'

export default function 角色聊({
  _id,
  动静,
}: {
  _id: ObjectId
  动静?: React.ReactNode
}) {
  return <ListItemText primary={动静} secondary={<查信息 _id={_id}/>} sx={{mx: '15px', my: '10px', wordBreak: 'break-all'}}/>
}
