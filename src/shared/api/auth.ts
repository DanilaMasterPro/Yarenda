import { gql } from "./client";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  phone: string | null;
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
        phone
        username
        avatar
        description
        createdAt
      }
    }
  `);
  return data.profile;
}

export interface UpdateUserInput {
  username?: string;
  phone?: string;
  description?: string;
  avatar?: string;
}

export async function updateUserRequest(
  input: UpdateUserInput,
): Promise<AuthUser> {
  const fields = Object.entries(input)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n    ");

  const data = await gql<{ updateUser: Omit<AuthUser, "createdAt"> }>(`
    mutation {
      updateUser(input: {
        ${fields}
      }) {
        id
        email
        phone
        username
        description
        avatar
      }
    }
  `);
  return data.updateUser as AuthUser;
}

export { saveTokens, clearTokens } from "./tokens";
