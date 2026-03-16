import { NextRequest, NextResponse } from "next/server";

const YANDEX_API_KEY = process.env.YANDEX_MAPS_API_KEY!;
const GEOCODER_URL = "https://geocode-maps.yandex.ru/1.x/";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const geocode = searchParams.get("geocode");
  const results = searchParams.get("results") || "1";

  if (!geocode) {
    return NextResponse.json(
      { error: "geocode param required" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    apikey: YANDEX_API_KEY,
    geocode,
    format: "json",
    results,
  });

  const res = await fetch(`${GEOCODER_URL}?${params}`);
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
