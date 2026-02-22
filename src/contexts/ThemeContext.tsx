'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    // Only runs on client side due to dynamic import with ssr: false
    let savedTheme: Theme | null = null
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        savedTheme = localStorage.getItem('theme') as Theme | null
      }
    } catch {
      // localStorage not available
    }
    
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'light'
      setTheme(initialTheme)
      applyTheme(initialTheme)
    }
    
    setMounted(true)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement
      const body = document.body
      if (newTheme === 'dark') {
        html.classList.add('dark')
        body.classList.add('dark')
      } else {
        html.classList.remove('dark')
        body.classList.remove('dark')
      }
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
    applyTheme(newTheme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
