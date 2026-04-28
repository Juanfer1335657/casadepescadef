import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/CartModal";
import CartNotification from "@/components/CartNotification";

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
      <body>
        <CartProvider>
          {children}
          <CartModal />
          <CartNotification />
        </CartProvider>
      </body>
    </html>
  );
}