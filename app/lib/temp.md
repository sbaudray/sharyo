- [ ] As an organisation manager, I can sign up to Sharyo

Info needed:

- name
- username (email)
- password

Signup form collects the informations

On submit:

I check existing user_credentials_password with email
If existing user_credentials, abort
I create a user with role org_manager and fullname
I create user_credentials_password with email and password
I create a default organisation
I create a link in user_organisations table
