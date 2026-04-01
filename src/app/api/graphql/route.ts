import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL ?? "http://localhost:4200/graphql";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const auth = request.headers.get("Authorization");
  if (auth) headers["Authorization"] = auth;

  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers,
    body,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
