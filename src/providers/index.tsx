import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { AuthProvider } from './Auth'
import { CartProvider } from './Cart'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <NextIntlClientProvider>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <HeaderThemeProvider>{children}</HeaderThemeProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
