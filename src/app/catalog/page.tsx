"use client";

import dynamic from "next/dynamic";

const CatalogClient = dynamic(
  () => import("./CatalogClient").then((m) => m.CatalogClient),
  { ssr: false },
);

export default function CatalogPage() {
  return <CatalogClient />;
}
