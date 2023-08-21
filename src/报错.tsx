import {Alert, AlertTitle, Typography} from '@mui/material'

export default function 报错({
  错误: {name, message, stack},
  关闭,
}: {
  错误: Error
  关闭: () => void
}) {
  return (
    <Alert severity="error" sx={{maxWidth: '100%'}} onClose={() => 关闭()}>
      <AlertTitle>{`${name}：${message}`}</AlertTitle>
      <Typography component="pre">{stack}</Typography>
    </Alert>
  )
}
