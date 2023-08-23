import 显人设 from '@/kit/展示/显人设'
import {Home} from '@mui/icons-material'
import {AccordionSummary, alpha, styled} from '@mui/material'

const Summary = styled(AccordionSummary)(({theme}) => ({
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
}))

export default function 显主持({
  情节,
  真名,
  萌差,
  补充,
  展开,
  set展开,
}: {
  情节: string
  真名: string
  萌差: string
  补充: string
  展开: boolean
  set展开: React.Dispatch<boolean>
}) {
  return (
    <显人设 情节={情节} 真名={真名} 萌差={萌差} 补充={补充} 展开={展开} set展开={set展开} Summary={Summary} url="/">
      <Home/>
    </显人设>
  )
}
