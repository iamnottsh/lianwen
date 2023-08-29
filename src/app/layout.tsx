'use client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {createTheme, CssBaseline, darken, lighten, ThemeProvider, useMediaQuery} from '@mui/material'
import {grey, pink, purple} from '@mui/material/colors'
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
        background: {default: darken(grey[600], 0.875)},
      } : {
        primary: {main: purple[500]},
        secondary: {main: pink[300]},
        background: {default: lighten(grey.A400, 0.875)},
      },
    },
    typography: {
      fontSize: 15.75,
    },
    spacing: 9,
  }, zhCN), [prefersDarkMode])
  return (
    <html lang="zh-cmn-Hans">
      <body>
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
        <ThemeProvider theme={theme}><CssBaseline/>{children}</ThemeProvider>
      </body>
    </html>
  )
}
