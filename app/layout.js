
import { Inter } from 'next/font/google'

import './styles/globals.css'
import Nav from '@/app/components/NavBar';
import Footer from '@/app/components/FooterBar';
import AuthProvider from '@/app/context/auth-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'runPen',
  description: 'Your personal digital training journal.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta 
          name="google-site-verification" 
          content="5dn7bCy9bR7Fc5pP1I5mZcuu9ASoGzDbk4ImIQVKDvc"
        />
      </head>
      <body className={inter.className} style={{"height": "100%"}}>
          <AuthProvider>
            <Nav/>
            {children}
            <Footer/>
          </AuthProvider>
      </body>
    </html>
  );
}
