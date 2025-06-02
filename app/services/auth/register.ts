import { db } from '../../lib/db'
import argon2 from 'argon2'

interface Params {
  email: string
  password: string
}

async function register({ email, password }: Params) {
  try {
    await db.transaction().execute(async (trx) => {
      const userCredentials = await trx
        .selectFrom('user_credentials_password')
        .select('username')
        .where('username', '=', email)
        .executeTakeFirst()

      if (userCredentials) {
        throw new Error('Cet utilisateur existe déjà.')
      }

      const orgAdminRole = await trx
        .selectFrom('roles')
        .select('id')
        .where('name', '=', 'org_admin')
        .executeTakeFirstOrThrow()

      const user = await trx
        .insertInto('users')
        .values({
          role_id: orgAdminRole.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow()

      await trx
        .insertInto('user_credentials_password')
        .values({
          user_id: user.id,
          username: email,
          password_hash: await argon2.hash(password),
        })
        .execute()

      const defaultOrganisation = await trx
        .insertInto('organisations')
        .values({
          name: 'My organisation',
        })
        .returning('id')
        .executeTakeFirstOrThrow()

      await trx
        .insertInto('user_organisations')
        .values({
          user_id: user.id,
          organisation_id: defaultOrganisation.id,
        })
        .execute()
    })

    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      }
    }

    return {
      error: 'Erreur inattendue.',
    }
  }
}

export { register }
