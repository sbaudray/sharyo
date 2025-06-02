import { Button, Heading, Text, TextField } from '@radix-ui/themes'
import type { Route } from './+types/register'
import { register } from '~/services/auth/register'

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email) {
    return 'Email manquant'
  }

  if (!password) {
    return 'Mot de passe manquant'
  }

  return await register({ email, password })
}

export default function Register({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <meta name="description" content="Sign up - Sharyo" />
      <Heading>Créez votre compte</Heading>
      <form method="post" noValidate>
        <label>
          <Text as="div">Email</Text>
          <TextField.Root name="email" type="email" placeholder="Entrez votre email" />
        </label>
        <label>
          <Text as="div">Mot de passe</Text>
          <TextField.Root name="password" type="password" placeholder="Entrez votre mot de passe" />
        </label>
        <Button type="submit">S'enregistrer</Button>
      </form>
      {actionData ? <div>{JSON.stringify(actionData)}</div> : null}
    </div>
  )
}
