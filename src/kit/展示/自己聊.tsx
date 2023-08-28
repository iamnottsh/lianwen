import {ListItem, Paper} from '@mui/material'
import {ObjectId} from 'bson'
import 角色聊 from './角色聊'

export default function 自己聊({
  _id,
  动静,
}: {
  _id: ObjectId
  动静?: React.ReactNode
}) {
  return (
    <ListItem sx={{justifyContent: 'right'}}>
      <Paper sx={{borderRadius: '20px 5px 20px 20px', ml: '5%'}}>
        <角色聊 _id={_id} 动静={动静}/>
      </Paper>
    </ListItem>
  )
}
