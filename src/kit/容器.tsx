import {Container} from '@mui/material'

export default function 容器({
  component,
  children,
}: {
  component: React.ElementType
  children?: React.ReactNode
}) {
  return <Container component={component} sx={{p: 1.5}}>{children}</Container>
}
