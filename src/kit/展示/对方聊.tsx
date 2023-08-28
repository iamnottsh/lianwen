import {ListItem, PaperProps} from '@mui/material'
import {ObjectId} from 'bson'
import 角色聊 from './角色聊'

export default function 对方聊({
  _id,
  动静,
  Pa,
}: {
  _id: ObjectId
  动静?: React.ReactNode
  Pa: React.ComponentType<PaperProps>
}) {
  return (
    <ListItem sx={{justifyContent: 'left'}}>
      <Pa sx={{borderRadius: '5px 20px 20px 20px', mr: '5%'}}>
        <角色聊 _id={_id} 动静={动静}/>
      </Pa>
    </ListItem>
  )
}
