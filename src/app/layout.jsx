import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import NextAuthProvider from "@/provider/NextAuthProvider";


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
    <NextAuthProvider>
    {/* <ClerkProvider
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
    > */}
<>  

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased font-poppins`}
        >
   <div className="flex flex-col">
           <Header />
          <main >
            {children}
          </main>
          <Footer />
   </div>
        </body>
      </html>

      </>

    </NextAuthProvider>
  );
}