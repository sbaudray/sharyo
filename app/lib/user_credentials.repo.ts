import { sql } from "./db";

async function getUserCredentialsByUsername(username: string) {
  const [userCredentials = null] = await sql`
        SELECT user_id,username
        FROM user_credentials_password
        WHERE username = ${username}
        LIMIT 1;
    `;

  return userCredentials;
}

export { getUserCredentialsByUsername };
