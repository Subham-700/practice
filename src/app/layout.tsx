import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Explorer",
  description: "Browse and search products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
