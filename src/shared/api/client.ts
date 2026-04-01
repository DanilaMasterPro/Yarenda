import axios, { type InternalAxiosRequestConfig } from "axios";
import {
  saveTokens,
  clearTokens,
  getTokens,
  refreshTokensRequest,
} from "./tokens";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200";
const GQL_URL = BASE_URL + "/graphql";

export const apiClient = axios.create({
  baseURL: GQL_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach stored access token to every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
  }
  return config;
});

/** Thin GraphQL executor — throws on GraphQL-level errors */
export async function gql<T>(query: string): Promise<T> {
  const { data } = await apiClient.post<{
    data: T;
    errors?: { message: string }[];
  }>("", { query });
  if (data.errors?.length) throw new Error(data.errors[0].message);
  return data.data;
}

// ── Auto token refresh on 401 ─────────────────────────────────────────────
let _isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      !axios.isAxiosError(error) ||
      error.response?.status !== 401 ||
      original._retry ||
      _isRefreshing
    ) {
      return Promise.reject(error);
    }

    if (typeof window === "undefined") return Promise.reject(error);

    const tokens = getTokens();
    if (!tokens?.refreshToken) return Promise.reject(error);

    original._retry = true;
    _isRefreshing = true;

    try {
      const newTokens = await refreshTokensRequest(tokens.refreshToken);
      saveTokens(newTokens);
      original.headers.Authorization = `Bearer ${newTokens.accessToken}`;
      return apiClient(original);
    } catch {
      clearTokens();
      return Promise.reject(error);
    } finally {
      _isRefreshing = false;
    }
  },
);
