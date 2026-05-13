import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Tauedea Gabi — Frontend Engineer & UI/UX Designer',
  description: 'Portfolio of Tauedea Arehui Gabi, a frontend engineer and UI/UX designer specializing in Next.js, React, and Tailwind CSS.',
  keywords: ['frontend engineer', 'UI/UX designer', 'Next.js', 'React', 'portfolio'],
  openGraph: {
    title: 'Tauedea Gabi — Frontend Engineer & UI/UX Designer',
    description: 'Portfolio of Tauedea Arehui Gabi',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-dark text-white antialiased">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#ffffff',
              border: '1px solid rgba(212, 160, 23, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#D4A017',
                secondary: '#0A0A0A',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}