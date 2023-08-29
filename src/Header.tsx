import manifest from '@/../public/manifest.json'
import useOpenOrClose from '@/kit/useOpenOrClose'
import 全屏对话框 from '@/kit/全屏对话框'
import 报错 from '@/kit/报错'
import {GitHub, SvgIconComponent, SyncAlt} from '@mui/icons-material'
import {AppBar, Box, Button, CircularProgress, Stack, TextField, Toolbar, Typography} from '@mui/material'
import {useEffect, useState} from 'react'

function Micro({
  onClick,
  Icon,
}: {
  onClick: React.DispatchWithoutAction
  Icon: SvgIconComponent
}) {
  return <Button variant="contained" color="secondary" sx={{minWidth: 0, p: 0.5}} onClick={onClick}><Icon fontSize="small"/></Button>
}

export function Storage() {
  const [data, setData] = useState('')
  useEffect(() => {
    setData(JSON.stringify(Object.entries(localStorage), null, '\t'))
  }, [])
  const [错误, set错误] = useState<Error | false | null>()
  const 深刻 = 错误 === false
  const 加载 = 错误 === null
  const 关闭 = () => set错误(undefined)
  return (
    <Stack
      spacing={0.5}
      component="form"
      autoComplete="off"
      onSubmit={event => {
        event.preventDefault()
        set错误(false)
        const map = new Map<string, string | null>()
        const set = new Set(Object.keys(localStorage))
        try {
          const parsed: [string, string][] = JSON.parse(data)
          parsed.forEach(([key, value]) => {
            localStorage.setItem(key, value)
            map.set(key, localStorage.getItem(key))
            set.delete(key)
          })
          set.forEach((_, key) => localStorage.removeItem(key))
          location.reload()
        } catch (e) {
          map.forEach((value, key) => {
            if (value === null) localStorage.removeItem(key)
            else localStorage.setItem(key, value)
          })
          if (e instanceof Error) set错误(e)
          else {
            关闭()
            throw e
          }
        }
      }}
    >
      <TextField
        id="凭据"
        label="凭据"
        value={data}
        onChange={event => setData(event.target.value)}
        fullWidth
        multiline
        autoFocus
        maxRows={14}
      />
      <Stack direction="row" spacing={1} justifyContent="center">
        <Box position="relative">
          {深刻 && <CircularProgress size={30} sx={{position: 'absolute', top: '50%', left: '50%', mt: '-15px', ml: '-15px'}}/>}
          <TextField
            id="写入"
            value="写入"
            color="primary"
            component={Button}
            InputProps={{size: 'small'}}
            inputProps={{type: 'submit'}}
            disabled={深刻}
          />
        </Box>
        <Box position="relative">
          {加载 && <CircularProgress size={30} sx={{position: 'absolute', top: '50%', left: '50%', mt: '-15px', ml: '-15px'}}/>}
          <TextField
            id="复制"
            value="复制"
            color="secondary"
            component={Button}
            InputProps={{size: 'small'}}
            inputProps={{type: 'button'}}
            disabled={加载}
            onClick={() => {
              set错误(null)
              navigator.clipboard.writeText(data)
                .then(关闭)
                .catch(e => {
                  if (e instanceof Error) set错误(e)
                  else throw e
                })
            }}
          />
        </Box>
      </Stack>
      {错误 && <报错 错误={错误} 关闭={关闭}/>}
    </Stack>
  )
}


export default function Header({
  prefix,
  separator,
}: {
  prefix: string
  separator: string
}) {
  useEffect(() => {
    document.title = prefix + separator + manifest.name
  }, [prefix, separator])
  const [is, handleOpen, handleClose] = useOpenOrClose()
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>{prefix}</Typography>
          <Stack direction="row" spacing={1}>
            <Micro onClick={() => open('https://github.com/iamnottsh/lianwen', '_blank')} Icon={GitHub}/>
            <Micro onClick={handleOpen} Icon={SyncAlt}/>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <全屏对话框 is={is} handleClose={handleClose} title="权能迁移"><Storage/></全屏对话框>
    </>
  )
}
