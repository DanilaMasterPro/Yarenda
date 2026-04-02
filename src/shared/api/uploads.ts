import { refreshOnce } from "./client";
import { clearTokens, getTokens } from "./tokens";

export async function uploadFilesRequest(files: File[]): Promise<string[]> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200";
  const url = `${backendUrl}/api/uploads`;

  async function doUpload(accessToken: string): Promise<Response> {
    const form = new FormData();
    files.forEach((file) => form.append("files", file));
    return fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form,
    });
  }

  const tokens = getTokens();
  if (!tokens) throw new Error("Unauthorised");

  let res = await doUpload(tokens.accessToken);

  // If 401 — refresh tokens and retry once
  if (res.status === 401) {
    try {
      const newTokens = await refreshOnce();
      res = await doUpload(newTokens.accessToken);
    } catch {
      clearTokens();
      throw new Error("Unauthorised");
    }
  }

  if (!res.ok) throw new Error("Ошибка загрузки файлов");
  const data: unknown = await res.json();
  const items: unknown[] = Array.isArray(data) ? data : [data];
  return items.map(
    (item: unknown) =>
      ((item as Record<string, string>)?.url ??
        (item as Record<string, string>)?.path ??
        item) as string,
  );
}
