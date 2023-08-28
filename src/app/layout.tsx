import Wrapper from '@/app/Wrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <html lang="zh-cmn-Hans"><Wrapper>{children}</Wrapper></html>
}
