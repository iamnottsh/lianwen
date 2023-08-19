export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cmn-Hans">
      <body>{children}</body>
    </html>
  )
}
