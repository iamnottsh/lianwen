import {ListItem, Paper} from '@mui/material'
import 角色聊 from './角色聊'

export default function 自己聊({
  动静,
}: {
  动静?: React.ReactNode
}) {
  return (
    <ListItem sx={{justifyContent: 'right'}}>
      <Paper sx={{borderRadius: '20px 0 20px 20px', ml: '5%'}}>
        <角色聊 动静={动静}/>
      </Paper>
    </ListItem>
  )
}
