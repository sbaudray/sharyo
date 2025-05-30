import type { Route } from '../+types/home'
import { Welcome } from './home_welcome'
import { register } from '~/lib/auth/register'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const username = new URL(request.url).searchParams.get('username')
  console.log({ username })

  if (!username) {
    return
  }

  const result = await register(username)

  console.log({ result })

  // const result =
}

export default function Home() {
  return <Welcome />
}
