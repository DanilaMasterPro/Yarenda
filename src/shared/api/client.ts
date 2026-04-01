import axios from "axios";

const GQL_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/graphql";

export const apiClient = axios.create({
  baseURL: GQL_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach stored access token to every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("auth_tokens");
      if (raw) {
        const { accessToken } = JSON.parse(raw) as { accessToken: string };
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
      localStorage.removeItem("auth_tokens");
    }
  }
  return config;
});

export function saveTokens(tokens: { accessToken: string; refreshToken: string }) {
  localStorage.setItem("auth_tokens", JSON.stringify(tokens));
}

export function clearTokens() {
  localStorage.removeItem("auth_tokens");
}

/** Thin GraphQL executor — throws on GraphQL-level errors */
export async function gql<T>(query: string): Promise<T> {
  const { data } = await apiClient.post<{
    data: T;
    errors?: { message: string }[];
  }>("", { query });
  if (data.errors?.length) throw new Error(data.errors[0].message);
  return data.data;
}
