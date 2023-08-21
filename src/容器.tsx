import {Container} from '@mui/material'

export default function 容器({
  component = 'div',
  children,
}: {
  component?: React.ElementType
  children?: React.ReactNode
}) {
  return <Container component={component} maxWidth="md" sx={{p: 3}}>{children}</Container>
}
