import { useContext } from 'react'
import { ThemeContext as StyledThemeCopntext } from 'styled-components'
import { ThemeContext } from 'contexts/ThemeContext'
import { useColorMode } from 'theme-ui'

const useTheme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const [, setColorMode] = useColorMode()
  setColorMode(isDark ? 'dark' : 'light')
  const theme = useContext(StyledThemeCopntext)
  return { isDark, toggleTheme, theme }
}

export default useTheme
