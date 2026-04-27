import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Casa de Pesca",
  description: "Tienda de artículos de pesca - La Casa de Pesca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}