import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/constants';
import { Toaster } from '@/components/ui/toaster';
import '@/assets/styles/globals.css';
// import '@uploadthing/react/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { 
    template: `%s | Prostore`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};
