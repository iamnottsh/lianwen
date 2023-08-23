import {ArrowBackIosNewSharp} from '@mui/icons-material'
import {Accordion, AccordionDetails, AccordionSummaryProps, Box, Chip, Fab, Typography} from '@mui/material'
import {useRouter} from 'next/navigation'

export default function 显人设({
  情节,
  真名,
  萌差,
  补充,
  展开,
  set展开,
  Summary,
  url,
  children,
}: {
  情节: string
  真名: string
  萌差: string
  补充: string
  展开: boolean
  set展开: React.Dispatch<boolean>
  Summary: React.ComponentType<AccordionSummaryProps>
  url: string
  children?: React.ReactNode
}) {
  const {push} = useRouter()
  return (
    <Accordion expanded={展开} onChange={(_, value) => set展开(value)}>
      <Summary expandIcon={<ArrowBackIosNewSharp/>} sx={{'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {transform: 'rotate(-90deg)'}}}>
        <Typography variant="body1" component="pre" sx={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{情节}</Typography>
      </Summary>
      <AccordionDetails sx={{'&>:not(style)': {my: 1.5}}}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="div" sx={{wordBreak: 'break-all'}}>{真名}</Typography>
          <Chip label={萌差}/>
        </Box>
        <Typography component="pre" color="text.secondary" sx={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{补充}</Typography>
        <Fab color="secondary" onClick={() => push(url)}>{children}</Fab>
      </AccordionDetails>
    </Accordion>
  )
}
