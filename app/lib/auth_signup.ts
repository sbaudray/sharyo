import { getUserCredentialsByUsername } from "./user_credentials.repo";

async function signUp(username: string) {
  const userCredentials = await getUserCredentialsByUsername(username);

  if (userCredentials) {
    console.log(userCredentials);
    return {
      error: "Existing user",
    };
  }

  return "OK";
}

export { signUp };
