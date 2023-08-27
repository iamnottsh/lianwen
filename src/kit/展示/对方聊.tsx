import {ListItem, PaperProps} from '@mui/material'
import 角色聊 from './角色聊'

export default function 对方聊({
  动静,
  Pa,
}: {
  动静?: React.ReactNode
  Pa: React.ComponentType<PaperProps>
}) {
  return (
    <ListItem sx={{justifyContent: 'left'}}>
      <Pa sx={{borderRadius: '0 20px 20px 20px', mr: '5%'}}>
        <角色聊 动静={动静}/>
      </Pa>
    </ListItem>
  )
}
