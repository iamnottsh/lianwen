import {ListItemText} from '@mui/material'

export default function 角色聊({
  动静,
}: {
  动静?: React.ReactNode
}) {
  return <ListItemText primary={动静} sx={{mx: '15px', my: '10px', wordBreak: 'break-all'}}/>
}
