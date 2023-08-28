import {title} from '@/config'
import {AppBar, Toolbar, Typography} from '@mui/material'
import {useEffect} from 'react'

export default function Header({
  prefix,
  separator,
}: {
  prefix: string
  separator: string
}) {
  useEffect(() => {
    document.title = prefix + separator + title
  }, [prefix, separator])
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>{prefix}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  )
}
