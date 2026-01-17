import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Amar Shop | Your Ultimate Shopping Destination",
    template: "%s | Amar Shop"
  },
  description: "Discover amazing deals, shop premium products, and experience seamless online shopping with Amar Shop - Your trusted marketplace for quality and value."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-poppins`}
      >
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#2563eb', // blue-600
              borderRadius: '0.5rem',
            },
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
              footerActionLink: 'text-blue-600 hover:text-blue-700',
            }
          }}
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}