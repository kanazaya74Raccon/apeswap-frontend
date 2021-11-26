import React, { useEffect } from 'react'
import { useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { useHomeModal } from '@apeswapfinance/uikit'

const HomeModalCheck: React.FC = () => {
  const location = useLocation()
  const params = useParams()
  const route = useRouteMatch()

  const { onPresentHomeModal } = useHomeModal(
    "Welcome to ApeSwap's Farms",
    'Start earning passive income with your cryptocurrency!',
    () => null,
    () => null,
    () => null,
    () => null,
  )

  console.log('location', location)
  console.log('params', params)
  console.log('route', route)

  return <div>{onPresentHomeModal}</div>
  // return <div>{route && route.path.includes('?startModal=simple') && onPresentHomeModal}</div>
}

export default HomeModalCheck
