import 角色体 from '@/kit/数据/角色体'
import {ArrowForwardIosSharp} from '@mui/icons-material'
import {Accordion, AccordionDetails, AccordionSummaryProps, Box, Chip, CircularProgress, Fab, Stack, Typography} from '@mui/material'
import {useState} from 'react'

export default function 显人设({
  角色,
  展开: [expanded, setExpanded],
  Summary,
  url,
  children,
}: {
  角色: 角色体
  展开: [boolean, React.Dispatch<boolean>]
  Summary: React.ComponentType<AccordionSummaryProps>
  url: string
  children?: React.ReactNode
}) {
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
      </Stack>
    </Accordion>
  )
}
