import piazza from '@/data/server/piazza'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
  const 签名 = request.headers.get('Authorization')
  if (签名 === null) return NextResponse.json('fuck you')
  console.log(await piazza(await request.text(), 签名))
  return NextResponse.json('ok')
}
