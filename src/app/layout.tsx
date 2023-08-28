import Wrapper from '@/app/Wrapper'

export const metadata = {
  title: '联文岛',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <html lang="zh-cmn-Hans"><Wrapper>{children}</Wrapper></html>
}
