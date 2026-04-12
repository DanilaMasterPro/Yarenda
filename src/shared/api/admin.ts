import { gql } from "./client";
import type { UserRole } from "./auth";

export interface AdminUser {
  id: string;
  email: string;
  phone: string | null;
  username: string;
  role: UserRole;
  createdAt: string;
}

export interface GetUsersInput {
  take: number;
  skip: number;
}

export async function getUsersRequest(
  pagination: GetUsersInput,
): Promise<AdminUser[]> {
  const data = await gql<{ users: AdminUser[] }>(`
    query {
      users(pagination: { take: ${pagination.take}, skip: ${pagination.skip} }) {
        id
        email
        phone
        username
        role
        createdAt
      }
    }
  `);
  return data.users;
}

export interface SetUserRoleResult {
  id: string;
  email: string;
  role: UserRole;
}

export async function setUserRoleRequest(
  userId: string,
  role: UserRole,
): Promise<SetUserRoleResult> {
  const data = await gql<{ setUserRole: SetUserRoleResult }>(`
    mutation {
      setUserRole(userId: ${JSON.stringify(userId)}, role: ${role}) {
        id
        email
        role
      }
    }
  `);
  return data.setUserRole;
}
