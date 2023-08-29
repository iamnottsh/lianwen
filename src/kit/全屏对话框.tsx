import {Close} from '@mui/icons-material'
import {AppBar, Dialog, DialogContent, IconButton, Slide, Toolbar, Typography} from '@mui/material'
import {TransitionProps} from '@mui/material/transitions'
import {forwardRef} from 'react'
import 容器 from './容器'

const TransitionComponent = forwardRef(function Transition(
  {children, ...props}: TransitionProps & {children: React.ReactElement},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props}>{children}</Slide>
})

export default function 全屏对话框({
  is,
  handleClose,
  title,
  children,
}: {
  is: boolean
  handleClose: () => void
  title: string
  children?: React.ReactNode
}) {
  return (
    <Dialog
      fullScreen
      open={is}
      onClose={handleClose}
      TransitionComponent={TransitionComponent}
    >
      <AppBar color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>{title}</Typography>
          <IconButton size="large" color="inherit" edge="end" onClick={handleClose}><Close/></IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <容器 component={DialogContent}>{children}</容器>
    </Dialog>
  )
}
