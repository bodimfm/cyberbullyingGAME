import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/theme-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Detetives Digitais',
  description: 'Jogo educativo sobre cyberbullying',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
