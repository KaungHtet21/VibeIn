import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { toggleTheme, setTheme, type ThemeMode } from '../store/slices/themeSlice'

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.mode)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleTheme())
  }

  const setMode = (mode: ThemeMode) => {
    dispatch(setTheme(mode))
  }

  return {
    theme,
    toggle,
    setMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }
} 