import {Button, Divider} from '@mui/material'

export default function 列人设({
  is,
  before,
  newest,
  children,
}: {
  is: boolean
  before: React.DispatchWithoutAction
  newest: React.DispatchWithoutAction
  children?: React.ReactNode
}) {
  return (
    <>
      <Divider>
        <Button onClick={before} disabled={is}>加载更旧</Button>
      </Divider>
      {children}
      <Divider>
        <Button onClick={newest} disabled={is}>加载最新</Button>
      </Divider>
    </>
  )
}
