import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Free File Converter - Convert Images & Documents Online',
  description: 'Free online file converter. Convert images (PNG, JPG, JPEG, HEIC, WebP) and documents (Word, PDF, WPS) instantly. No signup required.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
