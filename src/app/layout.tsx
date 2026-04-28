import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/CartModal";
import CartNotification from "@/components/CartNotification";

export const metadata: Metadata = {
  title: "La Casa De La Pesca Villavicencio",
  description: "Tienda de artículos de pesca en Villavicencio - La Casa De La Pesca Villavicencio",
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