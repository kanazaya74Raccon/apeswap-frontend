import React from 'react'
import { useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { useHomeModal } from '@apeswapfinance/uikit'

const HomeModalCheck = () => {
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

  // return <>{onPresentHomeModal()}</>
  return <>{location && location.search.includes('?startModal=simple') && onPresentHomeModal()}</>
}

export default HomeModalCheck
