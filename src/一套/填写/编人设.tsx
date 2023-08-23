import useOpenOrClose from '@/useOpenOrClose'
import 全屏对话框 from '@/全屏对话框'
import 报错 from '@/报错'
import {Add} from '@mui/icons-material'
import {Box, Button, CircularProgress, Fab, MenuItem, Stack, TextField} from '@mui/material'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {情节最短, 情节最长, 真名最短, 真名最长, 萌差选项, 补充最长} from '../数据/人设体'

export default function 编人设({
  title,
  送出,
}: {
  title: string
  送出: (情节: string, 真名: string, 萌差: string, 补充: string) => Promise<string>
}) {
  const [is, handleOpen, handleClose] = useOpenOrClose()
  const [情节, set情节] = useState<string>('')
  const [真名, set真名] = useState<string>('')
  const [萌差, set萌差] = useState<string>('')
  const [补充, set补充] = useState<string>('')
  const [错误, set错误] = useState<Error | null>()
  const 加载 = 错误 === null
  const {push} = useRouter()
  return (
    <>
      <Fab color="secondary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={handleOpen}><Add/></Fab>
      <全屏对话框 open={is} handleClose={handleClose} title={title}>
        <Stack
          spacing={2}
          component="form"
          sx={{'& .MuiTextField-root': {m: 1}}}
          autoComplete="off"
          onSubmit={event => {
            event.preventDefault()
            set错误(null)
            送出(情节, 真名, 萌差, 补充).then(push).catch(set错误)
          }}
        >
          <TextField
            id="情节"
            label="情节"
            required
            value={情节}
            onChange={event => set情节(event.target.value)}
            inputProps={{minLength: 情节最短, maxLength: 情节最长}}
            fullWidth
            multiline
            minRows={6}
            autoFocus
          />
          <Stack direction="row">
            <TextField
              id="真名"
              label="真名"
              required
              value={真名}
              onChange={event => set真名(event.target.value)}
              inputProps={{minLength: 真名最短, maxLength: 真名最长}}
              sx={{flexGrow: 1}}
            />
            <TextField
              id="萌差"
              label="萌差"
              required
              value={萌差}
              onChange={event => set萌差(event.target.value)}
              select
              sx={{width: '25%'}}
            >
              {萌差选项.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </TextField>
          </Stack>
          <TextField
            id="补充"
            label="补充"
            value={补充}
            onChange={event => set补充(event.target.value)}
            inputProps={{maxLength: 补充最长}}
            fullWidth
            multiline
            minRows={4}
          />
          <Box display="flex" justifyContent="center" position="relative" m={1}>
            {加载 && <CircularProgress size={48} sx={{position: 'absolute', top: '50%', left: '50%', mt: '-24px', ml: '-24px'}}/>}
            <TextField
              id="送出"
              value="送出"
              color="primary"
              component={Button}
              inputProps={{type: 'submit'}}
              disabled={错误 === null}
            />
          </Box>
          {错误 && <报错 错误={错误} 关闭={() => set错误(undefined)}/>}
        </Stack>
      </全屏对话框>
    </>
  )
}
