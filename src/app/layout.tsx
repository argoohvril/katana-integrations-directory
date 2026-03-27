import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katana Integrations Directory",
  description: "All integrations and connections Katana customers ask about — 90+ tools across 13 categories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
