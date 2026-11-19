import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Hasilaza Motor - Tricycles et Motos au Sénégal | Tricycle 200CC, 250CC, 300CC',
  description: 'Hasilaza Motor - Leader de la vente de tricycles cargo (200CC, 250CC, 300CC 5 roues) et motos 150CC au Sénégal. Livraison gratuite sur Dakar, garantie 2 ans.',
  keywords: 'tricycles, motos, tricycle 200cc, tricycle 250cc, tricycle 300cc, moto 150cc, Sénégal, Hasilaza Motor, cargo, benne, transport',
  authors: [{ name: 'Hasilaza Motor' }],
  openGraph: {
    title: 'Hasilaza Motor - Tricycles et Motos au Sénégal',
    description: 'Leader de la vente de tricycles cargo et motos au Sénégal. Tricycle 200CC, 250CC, 300CC 5 roues et Moto 150CC.',
    type: 'website',
  },

  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: '#E53935',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
