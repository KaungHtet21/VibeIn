import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppProvider from './AppProvider.tsx'

// Initialize theme class on document
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme')
  // Default to dark theme
  const theme = savedTheme || 'dark'

  document.documentElement.classList.toggle('dark', theme === 'dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
)
