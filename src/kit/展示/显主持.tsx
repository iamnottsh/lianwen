import 显人设 from '@/kit/展示/显人设'
import 角色体 from '@/kit/数据/角色体'
import {Home} from '@mui/icons-material'
import {AccordionSummary, alpha, styled} from '@mui/material'

const Summary = styled(AccordionSummary)(({theme}) => ({
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
}))

export default function 显主持({
  角色,
  展开,
}: {
  角色: 角色体
  展开: [boolean, React.Dispatch<boolean>]
}) {
  return <显人设 角色={角色} 展开={展开} Summary={Summary} url="/"><Home/></显人设>
}
