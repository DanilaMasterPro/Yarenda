import type { Metadata } from "next";
import "@/styles/index.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Яренда — аренда вещей",
  description:
    "Платформа для аренды вещей. Экономьте деньги — арендуйте вместо покупки.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
