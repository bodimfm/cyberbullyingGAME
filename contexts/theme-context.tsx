"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themes, ThemeType, ThemeColors } from '@/lib/themes'

interface ThemeContextType {
  currentTheme: ThemeType
  colors: ThemeColors
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Alterado para usar o tema oabGoias como padrão
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('oabGoias')

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement
    Object.entries(themes[currentTheme]).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }, [currentTheme])

  const value = {
    currentTheme,
    colors: themes[currentTheme],
    setTheme: setCurrentTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}