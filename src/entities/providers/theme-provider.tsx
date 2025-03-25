'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useMounted } from '@/shared/lib/hooks'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { isMounted } = useMounted()
  return (
    <NextThemesProvider {...props}>{isMounted && children}</NextThemesProvider>
  )
}
