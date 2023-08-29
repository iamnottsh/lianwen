import manifest from '@/../public/manifest.json'
import Main from './Main'

export const metadata = {title: manifest.short_name}

export default function Page(props: any) {
  return <Main {...props}/>
}
