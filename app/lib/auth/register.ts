import { db } from '../db'

async function register(username: string) {
  const userCredentials = await db
    .selectFrom('user_credentials_password')
    .select('username')
    .where('username', '=', username)
    .executeTakeFirst()

  console.log({ userCredentials })

  if (userCredentials) {
    console.log(userCredentials)
    return {
      error: 'Existing user',
    }
  }

  return 'No existing user, can sign up'
}

export { register }
