import {Button, Divider} from '@mui/material'

export default function 列人设({
  is,
  end,
  before,
  newest,
  children,
}: {
  is: boolean
  end: boolean,
  before: React.DispatchWithoutAction
  newest: React.DispatchWithoutAction
  children?: React.ReactNode
}) {
  return (
    <>
      <Divider role="presentation" sx={{my: 1}}>
        {end ? <Button size="large" disabled>没有更旧</Button> : <Button size="large" onClick={before} disabled={is}>加载更旧</Button>}
      </Divider>
      {children}
      <Divider role="presentation" sx={{my: 1}}>
        <Button size="large" onClick={newest} disabled={is}>加载最新</Button>
      </Divider>
    </>
  )
}
