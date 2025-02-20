import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import AuthProvider from '@/app/providers/AuthProvider'; // Import the Client-Side AuthProvider
import { auth } from '@/auth';

import { Archivo } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/Navigation';
import ParagonProvider from './providers/ParagonProvider';

const archivo = Archivo({ subsets: ['latin'] })

export const metadata = {
  title: "PARAGON 40",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  // Fetch the session server-side
  const session = await auth()

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${archivo.className} antialiased`}
      >
        {/* Wrap children with AuthProvider and pass the session prop */}
        <AuthProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <ParagonProvider>
              {session?.user && <Navigation/>}
              <main>{children}</main>
            </ParagonProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}