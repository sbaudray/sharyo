import type { Route } from './+types/home'
import { register } from '~/services/auth/register'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return 'Welcome'
}
