import {Alert, AlertTitle, List, ListItem, ListItemText} from '@mui/material'
import ErrorStackParser from 'error-stack-parser'

export default function 报错({
  错误,
  关闭,
}: {
  错误: Error
  关闭: () => void
}) {
  return (
    <Alert severity="error" sx={{maxWidth: '100%'}} onClose={() => 关闭()}>
      <AlertTitle>{错误.toString()}</AlertTitle>
      <List dense>
        {ErrorStackParser.parse(错误).map((value, index) => <ListItem key={index}>
          <ListItemText primary={value.getFunctionName() ?? '<anonymous>'} secondary={`${value.getFileName()}:${value.getLineNumber()}:${value.getColumnNumber()}`}/>
        </ListItem>)}
      </List>
    </Alert>
  )
}
