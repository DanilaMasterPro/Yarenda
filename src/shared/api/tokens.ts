import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200";
const GQL_URL = BASE_URL + "/graphql";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export function saveTokens(tokens: TokenPair): void {
  localStorage.setItem("auth_tokens", JSON.stringify(tokens));
}

export function clearTokens(): void {
  localStorage.removeItem("auth_tokens");
}

export function getTokens(): TokenPair | null {
  try {
    const raw = localStorage.getItem("auth_tokens");
    return raw ? (JSON.parse(raw) as TokenPair) : null;
  } catch {
    localStorage.removeItem("auth_tokens");
    return null;
  }
}

/**
 * Raw refresh call — uses plain axios (NOT apiClient) to avoid circular deps.
 * Sends the refresh token as Bearer and returns a new token pair.
 */
export async function refreshTokensRequest(
  refreshToken: string,
): Promise<TokenPair> {
  const { data } = await axios.post<{
    data: { refreshTokens: TokenPair };
    errors?: { message: string }[];
  }>(
    GQL_URL,
    { query: "mutation { refreshTokens { accessToken refreshToken } }" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  if (data.errors?.length) throw new Error(data.errors[0].message);
  return data.data.refreshTokens;
}
