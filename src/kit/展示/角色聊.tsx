import {ListItemText} from '@mui/material'

export default function 角色聊({
  primary,
}: {
  primary?: React.ReactNode
}) {
  return <ListItemText primary={primary} sx={{mx: '15px', my: '10px', wordBreak: 'break-all'}}/>
}
