import { gql, saveTokens, clearTokens } from "./client";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  description: string | null;
  createdAt: string;
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<AuthTokens> {
  const data = await gql<{ login: AuthTokens }>(`
    mutation {
      login(input: {
        email: ${JSON.stringify(email)}
        password: ${JSON.stringify(password)}
      }) {
        accessToken
        refreshToken
      }
    }
  `);
  return data.login;
}

export async function registerRequest(
  email: string,
  password: string,
): Promise<AuthTokens> {
  const data = await gql<{ register: AuthTokens }>(`
    mutation {
      register(input: {
        email: ${JSON.stringify(email)}
        username: ${JSON.stringify(email)}
        password: ${JSON.stringify(password)}
      }) {
        accessToken
        refreshToken
      }
    }
  `);
  return data.register;
}

export async function getProfileRequest(): Promise<AuthUser> {
  const data = await gql<{ profile: AuthUser }>(`
    query {
      profile {
        id
        email
        username
        avatar
        description
        createdAt
      }
    }
  `);
  return data.profile;
}

export { saveTokens, clearTokens };
