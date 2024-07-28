import { ThemeProvider } from "@/components/theme-provider"
import "@styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn, generateLinkGoogleImage } from "@/lib/utils"
import { Metadata } from "next";
import Layout from "@/layouts/Layout";
import configEnv from "@/configEnv";

const fontSans = FontSans({
  subsets: ["vietnamese"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    template: "%s - Điện nước",
    default: "Điện nước Tâm Nhi",
  },
  description: 'Điện nước, dien nuoc,giá rẻ,gia re, chất lượng, chat luong, uy tín, uy tin, chính hãng, chinh hang',
  openGraph: {
    title: "Điện nước Tâm Nhi",
    description: 'Điện nước giá rẻ, chất lượng, uy tín, chính hãng',
    type: 'website',
    locale: 'vi_VN',
    url: `${configEnv.NEXT_PUBLIC_DOMAIN}`,
    phoneNumbers: '0938729853',
    countryName: 'Vietnam',
    siteName: 'Điện nước Tâm Nhi',
    images: [
      {
        url: `${generateLinkGoogleImage(configEnv.NEXT_PUBLIC_LOGO as string)}`,
        alt: 'Điện nước Tâm Nhi',
      },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

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
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
