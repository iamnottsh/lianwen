'use client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material'
import {pink, purple} from '@mui/material/colors'
import {zhCN} from '@mui/material/locale'
import {useMemo} from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      ...prefersDarkMode ? {
        primary: {main: purple.A100},
        secondary: {main: pink.A200},
      } : {
        primary: {main: purple[500]},
        secondary: {main: pink[300]},
      },
    },
  }, zhCN), [prefersDarkMode])
  return (
    <html lang="zh-cmn-Hans">
      <body><ThemeProvider theme={theme}><CssBaseline/>{children}</ThemeProvider></body>
    </html>
  )
}
