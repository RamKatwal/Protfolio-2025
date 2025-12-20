import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Leftbar from "./components/common/Leftbar";
import Header from "./components/common/header";
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
          <Leftbar />
          <Header />
          <main className="ml-50 mt-14 w-[calc(100%-240px)]">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
