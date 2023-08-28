import {Add} from '@mui/icons-material'
import {Box, Button, CircularProgress, Fab, MenuItem, Stack, TextField} from '@mui/material'
import {ObjectId} from 'bson'
import {useState} from 'react'
import {_id2str} from '../ObjectIdUrlSafeBase64'
import useOpenOrClose from '../useOpenOrClose'
import 全屏对话框 from '../全屏对话框'
import 报错 from '../报错'
import 角色体, {情节最短, 情节最长, 真名最短, 真名最长, 萌差选项, 补充最长} from '../数据/角色体'

function Tip({
  error,
  children,
}: {
  error?: boolean
  children?: React.ReactNode
}) {
  return <Box fontSize="smaller" {...error && {color: 'error.main'}}>{children}</Box>
}

export default function 编人设({
  title,
  送出,
  url,
}: {
  title: string
  送出: (角色: 角色体) => Promise<ObjectId>
  url: string
}) {
  const [is, open, close] = useOpenOrClose()
  const [情节, set情节] = useState(''), 情节error = 情节.length < 情节最短
  const [真名, set真名] = useState(''), 真名error = 真名.length < 真名最短
  const [萌差, set萌差] = useState(''), 萌差error = !萌差选项.includes(萌差)
  const [补充, set补充] = useState('')
  const [错误, set错误] = useState<Error | null>()
  const 加载 = 错误 === null
  return (
    <>
      <Fab color="secondary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={open}><Add/></Fab>
      <全屏对话框 open={is} handleClose={close} title={title}>
        <Stack
          spacing={0.5}
          component="form"
          autoComplete="off"
          onSubmit={event => {
            event.preventDefault()
            set错误(null)
            送出({情节, 真名, 萌差, 补充}).then(_id => {
              location.href = `/${url}/${_id2str(_id)}`
            }).catch(set错误)
          }}
        >
          <TextField
            id="情节"
            placeholder="情节"
            required
            value={情节}
            onChange={event => set情节(event.target.value)}
            inputProps={{minLength: 情节最短, maxLength: 情节最长}}
            helperText={<Tip error={情节error}>{情节.length}/{情节最短}</Tip>}
            fullWidth
            multiline
            minRows={5}
            autoFocus
          />
          <Box display="flex">
            <TextField
              id="真名"
              placeholder="真名"
              required
              value={真名}
              onChange={event => set真名(event.target.value)}
              inputProps={{minLength: 真名最短, maxLength: 真名最长}}
              helperText={<Tip error={真名error}>{真名.length}/{真名最短}</Tip>}
              sx={{flexGrow: 1, mr: 1}}
            />
            <TextField
              id="萌差"
              placeholder="萌差"
              required
              value={萌差}
              onChange={event => set萌差(event.target.value)}
              select
              helperText={<Tip error={萌差error}>选一个</Tip>}
              sx={{width: '37.5%'}}
            >
              {萌差选项.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </TextField>
          </Box>
          <TextField
            id="补充"
            placeholder="补充"
            value={补充}
            onChange={event => set补充(event.target.value)}
            inputProps={{maxLength: 补充最长}}
            helperText={<Tip>{补充.length}</Tip>}
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
              InputProps={{size: 'small'}}
              inputProps={{type: 'submit'}}
              disabled={情节error || 真名error || 萌差error || 错误 === null}
            />
          </Box>
          {错误 && <报错 错误={错误} 关闭={() => set错误(undefined)}/>}
        </Stack>
      </全屏对话框>
    </>
  )
}
