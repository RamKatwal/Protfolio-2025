import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./components/common/LayoutClient";
import { TooltipProvider } from "./components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ram Katwal",
  description: "Designer",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased overflow-x-hidden`}
      >
        <TooltipProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </TooltipProvider>
      </body>
    </html>
  );
}
