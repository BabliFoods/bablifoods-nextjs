import { Baloo_2 } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const baloo = Baloo_2({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  metadataBase: new URL('https://www.bablifoods.com'),
  title: {
    default: 'BabliFoods - Snacking Made Fun and Flavorful',
    template: '%s | BabliFoods',
  },
  description: 'BabliFoods offers playful, crunchy, and delicious snacks including crispy fryums, crunchy corn, and tasty farsan. Snacking made fun and flavorful!',
  keywords: [
    'BabliFoods',
    'Babli Food Products',
    'snacks',
    'fryums',
    'farsan',
    'misal farsan',
    'crunchy snacks',
    'Indian snacks',
  ],
  authors: [{ name: 'Babli Food Products' }],
  creator: 'Babli Food Products',
  publisher: 'Babli Food Products',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'BabliFoods - Snacking Made Fun and Flavorful',
    description: 'BabliFoods brings exciting, fun, and flavorful snacks for everyone. Join the BabliFoods family and make snack time a whole lot more fun!',
    url: 'https://www.bablifoods.com',
    siteName: 'BabliFoods',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BabliFoods - Snacking Made Fun and Flavorful',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BabliFoods - Snacking Made Fun and Flavorful',
    description: 'Snacking made fun and flavorful. Explore exciting, crunchy snacks from BabliFoods!',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baloo.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-CD9LNP22VX" />
    </html>
  )
}
