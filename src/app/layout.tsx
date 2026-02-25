import type { Metadata } from "next";
import "@/styles/index.css";
import { GSAPAnimationsProvider } from "@/providers";

export const metadata: Metadata = {
  title: "Яренда — аренда вещей у соседей",
  description:
    "Платформа для аренды вещей у соседей. Экономьте деньги — арендуйте вместо покупки.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <GSAPAnimationsProvider>{children}</GSAPAnimationsProvider>
      </body>
    </html>
  );
}
