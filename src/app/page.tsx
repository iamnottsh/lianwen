import title from '@/title'
import Main from './Main'

export const metadata = {title}

export default function Page(props: any) {
  return <Main {...props}/>
}
