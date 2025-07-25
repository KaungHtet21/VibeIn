import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
}

// Check for saved theme in localStorage or default to dark
const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
    // Default to dark theme (changed from system preference check)
    return 'dark'
  }
  return 'dark'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
        // Update document class for immediate CSS changes
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer 