import {alpha, Paper, styled} from '@mui/material'
import 对方聊 from './对方聊'

const Pa = styled(Paper)(({theme}) => ({backgroundColor: alpha(theme.palette.secondary.main, 0.2)}))

export default function 主控聊({
  动静,
}: {
  动静?: React.ReactNode
}) {
  return <对方聊 Pa={Pa} 动静={动静}/>
}
