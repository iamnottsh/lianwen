import 显人设 from '@/kit/展示/显人设'
import 角色体 from '@/kit/数据/角色体'
import {QuestionAnswer} from '@mui/icons-material'
import {AccordionSummary} from '@mui/material'

export default function 显角色({
  角色,
  展开,
  url,
}: {
  角色: 角色体
  展开: [boolean, React.Dispatch<boolean>]
  url: string
}) {
  return <显人设 角色={角色} 展开={展开} Summary={AccordionSummary} url={url}><QuestionAnswer/></显人设>
}
