import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartProgrammers Tanzania - Empowering Developers",
  description: "SmartProgrammers is a vibrant Tanzanian community focused on empowering developers through tutorials, resources, and mentorship.",
  keywords: "Tanzania programming, coding, community, developers, JavaScript, Python, tech education",
  
  robots: "index, follow",
  openGraph: {
    title: "SmartProgrammers Tanzania - Empowering Developers",
    description: "Join SmartProgrammers Tanzania to connect with fellow developers, access coding resources, and grow your skills in the tech industry.",
    url: "https://smartprogrammers.co.tz",
    siteName: "SmartProgrammers Tanzania",
    images: [
      {
        url: "https://smartprogrammers.co.tz/og-image.jpg",
        width: 800,
        height: 600,
        alt: "SmartProgrammers Tanzania Logo",
      }
    ],
    locale: "en_TZ",
    type: "website",
  },
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <Toaster/> 
        {children}
      </body>
    </html>
  );
}
