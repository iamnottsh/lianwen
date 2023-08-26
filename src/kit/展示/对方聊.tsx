import {ListItem, PaperProps} from '@mui/material'
import 角色聊 from './角色聊'

export default function 对方聊({
  primary,
  Pa,
}: {
  primary?: React.ReactNode
  Pa: React.ComponentType<PaperProps>
}) {
  return (
    <ListItem sx={{justifyContent: 'left'}}>
      <Pa sx={{borderRadius: '0 20px 20px 20px', mr: '5%'}}>
        <角色聊 primary={primary}/>
      </Pa>
    </ListItem>
  )
}
