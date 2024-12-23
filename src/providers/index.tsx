import { AuthProvider } from './Auth'
import { CartProvider } from './Cart'
import { HeaderThemeProvider } from './HeaderTheme'
import React from 'react'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  )
}
