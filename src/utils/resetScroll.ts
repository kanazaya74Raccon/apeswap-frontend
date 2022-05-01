import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ResetScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
