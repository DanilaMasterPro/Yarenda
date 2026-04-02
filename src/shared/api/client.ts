import axios from "axios";
import {
  saveTokens,
  clearTokens,
  getTokens,
  refreshTokensRequest,
  type TokenPair,
} from "./tokens";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200";
const GQL_URL = BASE_URL + "/graphql";

export const apiClient = axios.create({
  baseURL: GQL_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
  }
  return config;
});

// ── Refresh helper (deduplicates parallel calls into one request) ─────────
let _refreshPromise: Promise<TokenPair> | null = null;

export function refreshOnce(): Promise<TokenPair> {
  if (_refreshPromise) return _refreshPromise;

  const tokens = getTokens();
  if (!tokens?.refreshToken) {
    return Promise.reject(new Error("No refresh token"));
  }

  _refreshPromise = refreshTokensRequest(tokens.refreshToken)
    .then((newTokens) => {
      saveTokens(newTokens);
      return newTokens;
    })
    .finally(() => {
      _refreshPromise = null;
    });

  return _refreshPromise;
}

// ── GraphQL executor ──────────────────────────────────────────────────────
interface GqlError {
  message: string;
  extensions?: { code?: string };
}

interface GqlResponse<T> {
  data: T;
  errors?: GqlError[];
}

function isAuthError(errors?: GqlError[]): boolean {
  return !!errors?.some((e) => e.extensions?.code === "UNAUTHENTICATED");
}

/**
 * Sends a GraphQL query/mutation. If the server returns UNAUTHENTICATED,
 * refreshes tokens and retries once.
 */
export async function gql<T>(query: string): Promise<T> {
  const { data: body } = await apiClient.post<GqlResponse<T>>("", { query });

  // Happy path or non-auth error
  if (!isAuthError(body.errors)) {
    if (body.errors?.length) throw new Error(body.errors[0].message);
    return body.data;
  }

  // Auth error → refresh tokens and retry once
  if (typeof window === "undefined") {
    throw new Error(body.errors![0].message);
  }

  try {
    await refreshOnce();
  } catch {
    clearTokens();
    throw new Error(body.errors![0].message);
  }

  const { data: retryBody } = await apiClient.post<GqlResponse<T>>("", {
    query,
  });
  if (retryBody.errors?.length) throw new Error(retryBody.errors[0].message);
  return retryBody.data;
}
