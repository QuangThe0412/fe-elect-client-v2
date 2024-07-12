'use client';

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

import AppLayout from "@/layouts/AppLayout"
import PublicLayout from "@/layouts/PublicLayout";

const fontSans = FontSans({
  subsets: ["vietnamese"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const privatePaths = ["/login", "/register"];

  let Layout = AppLayout;
  if (privatePaths.includes(pathname)) {
    Layout = PublicLayout;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )} >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>
              {children}
              <Toaster />
            </Layout>
          </ThemeProvider>
      </body>
    </html>
  );
}
