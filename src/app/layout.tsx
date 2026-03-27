import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katana - Integrations Directory",
  description: "All integrations and connections Katana customers ask about — 90+ tools across 13 categories",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
