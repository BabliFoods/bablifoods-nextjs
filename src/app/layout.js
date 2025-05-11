import { Baloo_2 } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const baloo = Baloo_2({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'BabliFoods',
  description: 'Snacking made fun and flavorful',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baloo.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
