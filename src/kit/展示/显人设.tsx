import {Choice} from '@/kit/useSingleChoice'
import 角色体 from '../数据/角色体'
import {ArrowForwardIosSharp} from '@mui/icons-material'
import {Accordion, AccordionDetails, AccordionSummaryProps, Box, Chip, Fab, Stack, Typography} from '@mui/material'
import {ObjectId} from 'bson'
import 查信息 from './查信息'

export default function 显人设({
  _id,
  choice,
  角色,
  Summary,
  url,
  children,
}: {
  _id: ObjectId
  choice: Choice<ObjectId>
  角色: 角色体
  Summary: React.ComponentType<AccordionSummaryProps>
  url: string
  children?: React.ReactNode
}) {
  const [expanded, setExpanded] = choice(_id)
  return (
    <Accordion expanded={expanded} onChange={(_, value) => setExpanded(value)}>
      <Summary
        expandIcon={<ArrowForwardIosSharp sx={{fontSize: '0.9rem'}}/>}
        sx={{
          flexDirection: 'row-reverse',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {transform: 'rotate(90deg)'},
        }}
      >
        <Typography variant="body1" component="pre" sx={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', ml: 1}}>{角色.情节}</Typography>
      </Summary>
      <Stack component={AccordionDetails} p={2} spacing={1.5}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="div" sx={{wordBreak: 'break-all'}}>{角色.真名}</Typography><Chip label={角色.萌差}/>
        </Box>
        <Typography component="pre" color="text.secondary" sx={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{角色.补充}</Typography>
        <Fab color="secondary" onClick={() => open(`/${url}`, '_blank')}>{children}</Fab>
        <查信息 _id={_id}/>
      </Stack>
    </Accordion>
  )
}
