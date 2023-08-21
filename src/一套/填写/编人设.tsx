import useOpenOrClose from '@/useOpenOrClose'
import 全屏对话框 from '@/全屏对话框'
import {Add} from '@mui/icons-material'
import {Box, Fab, Stack} from '@mui/material'
import {useState} from 'react'

export default function 编人设({
  title,
  送出,
}: {
  title: string
  送出: (情节: string, 真名: string, 萌差: string, 补充: string) => Promise<void>
}) {
  const [_情节, set情节] = useState<string>()
  const 情节 = _情节 ?? ''
  const [_真名, set真名] = useState<string>()
  const 真名 = _真名 ?? ''
  const [_萌差, set萌差] = useState<string>()
  const 萌差 = _萌差 ?? ''
  const [_补充, set补充] = useState<string>()
  const 补充 = _补充 ?? ''
  const [错误, set错误] = useState<Error | null>()
  const [open, handleOpen, handleClose] = useOpenOrClose()
  return <>
    <Fab color="secondary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={handleOpen}><Add/></Fab>
    <全屏对话框 open={open} handleClose={handleClose} title={title}>
      <Stack
        spacing={2}
        component="form"
        sx={{'& .MuiTextField-root': {m: 1}}}
        autoComplete="off"
        onSubmit={event => {
          event.preventDefault()
          set错误(null)
          送出(情节, 真名, 萌差, 补充)
            .then(() => {
              set错误(undefined)
              set补充(undefined)
              set萌差(undefined)
              set真名(undefined)
              set情节(undefined)
              handleClose()
            })
            .catch(set错误)
        }}
      >
      </Stack>
    </全屏对话框>
  </>
}
