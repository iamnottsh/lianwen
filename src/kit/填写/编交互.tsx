import {Send} from '@mui/icons-material'
import {AppBar, Box, Button, CircularProgress, IconButton, InputAdornment, TextField} from '@mui/material'
import {ObjectId} from 'bson'
import {useRef, useState} from 'react'
import 做交互 from '../制作/做交互'
import 容器 from '../容器'
import 报错 from '../报错'

export default function 编交互({
  控者,
  定义,
  加解,
  签,
}: {
  控者: ObjectId
  定义: boolean
  加解: CryptoKey
  签: CryptoKey
}) {
  const [动静, set动静] = useState('')
  const [错误, set错误] = useState<Error | null>()
  const 加载 = 错误 === null
  const 关闭 = () => set错误(undefined)
  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const handleClick = () => {
    set错误(null)
    做交互(控者, 定义, 加解, 动静, 签).then(() => {
      关闭()
      set动静('')
      dispatchEvent(new Event('送出交互'))
      ref.current?.scrollIntoView({behavior: 'smooth'})
    }).catch(set错误)
  }
  const bar = (
    <容器 component="footer">
      <TextField
        id="动静"
        label="动静"
        value={动静}
        onChange={event => set动静(event.target.value)}
        onKeyDown={event => event.key === 'Enter' && handleClick()}
        InputProps={{
          endAdornment: <InputAdornment position="end" sx={{position: 'relative'}}>
            {加载 && <CircularProgress size={40} sx={{position: 'absolute', top: -20, left: 0}}/>}
            <IconButton color="secondary" edge="end" onClick={handleClick} disabled={加载}><Send/></IconButton>
          </InputAdornment>,
        }}
        inputRef={inputRef}
        fullWidth
        autoFocus
        autoComplete="off"
      />
      <Box display="flex" flexDirection="row">
        {['，', '。', '？', '！', '、', '…', '~', '❤️', '（', '）', '/*', '*/'].map(s => <Button
          key={s}
          color="inherit"
          sx={{minWidth: 0, width: '100%'}}
          onClick={() => {
            const {current} = inputRef
            if (!current) return
            const {value, selectionStart, selectionEnd} = current
            const start = selectionStart ?? 0, end = selectionEnd ?? 0
            const newValue = `${value.substring(0, start)}${s}${value.substring(end)}`
            current.value = newValue
            current.focus()
            const p = start + s.length
            current.setSelectionRange(p, p)
            set动静(newValue)
          }}
        >{s}</Button>)}
      </Box>
      {错误 && <报错 错误={错误} 关闭={关闭}/>}
    </容器>
  )
  return (
    <>
      <Box visibility="hidden" ref={ref}>{bar}</Box>
      <AppBar position="fixed" color="inherit" sx={{top: 'auto', bottom: 0, maxHeight: '100%', overflow: 'auto'}}>{bar}</AppBar>
    </>
  )
}
