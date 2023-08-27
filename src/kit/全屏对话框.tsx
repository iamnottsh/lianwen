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
  open,
  handleClose,
  title,
  children,
}: {
  open: boolean
  handleClose: () => void
  title: string
  children?: React.ReactNode
}) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={TransitionComponent}
    >
      <AppBar color="secondary">
        <Toolbar>
          <Typography sx={{flexGrow: 1}} variant="h6" component="div">{title}</Typography>
          <IconButton size="large" color="inherit" edge="end" onClick={handleClose}><Close/></IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <容器 component={DialogContent}>{children}</容器>
    </Dialog>
  )
}
