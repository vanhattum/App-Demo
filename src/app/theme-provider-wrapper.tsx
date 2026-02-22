'use client'

import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useState } from 'react'

const ThemeProvider = dynamic(
  () => import('@/contexts/ThemeContext').then(mod => ({ default: mod.ThemeProvider })),
  { ssr: false }
)

const AuthProvider = dynamic(
  () => import('@/contexts/AuthContext').then(mod => ({ default: mod.AuthProvider })),
  { ssr: false }
)

export function ProvidersWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}


