import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/providers";
import Loading from "./loading";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Toaster position="top-right" reverseOrder={false} />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}