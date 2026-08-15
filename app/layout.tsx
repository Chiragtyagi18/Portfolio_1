import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import LoadingScreen from '@/components/loader'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chirag Tyagi — Full Stack Developer & AI Builder',
  description: 'Neo-brutalist portfolio of Chirag Tyagi, a full stack developer and AI builder crafting performant web applications.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f05a28',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body><LoadingScreen />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
