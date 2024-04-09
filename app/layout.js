
import { Inter } from 'next/font/google'

import './styles/globals.css'
import Nav from '@/app/components/NavBar';
import Footer from '@/app/components/FooterBar';
import AuthProvider from '@/app/context/auth-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'runPen',
  description: 'Your private digital training journal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
          <AuthProvider>
            <Nav/>
            {children}
            <Footer/>
          </AuthProvider>
      </body>
    </html>
  );
}
