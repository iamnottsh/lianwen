import 对方聊 from './对方聊'
import {alpha, Paper, styled} from '@mui/material'

const Pa = styled(Paper)(({theme}) => ({backgroundColor: alpha(theme.palette.secondary.main, 0.2)}))

export default function 主控聊({
  primary,
}: {
  primary?: React.ReactNode
}) {
  return <对方聊 Pa={Pa} primary={primary}/>
}
