import React from 'react'
import { useFetchSwapBanners } from 'state/strapi/fetchStrapi'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SwapBanner: React.FC = () => {
  const banners = useFetchSwapBanners()
  const location = useLocation()
  const bannerToDisplay = banners.swapBannersData.find((banner) => {
    if (location.search.includes(`banner=${banner?.param}`)) {
      return banner
    }
    return null
  })
  const defaultBanner = banners.swapBannersData.find((banner) => {
    if (banner?.param === 'default') {
      return banner
    }
    return null
  })

  return (
    <>
      {bannerToDisplay ? (
        <a href={bannerToDisplay?.link} target="_blank" rel="noopener noreferrer">
          <StyledBanner image={bannerToDisplay?.desktop?.url} />
        </a>
      ) : (
        <a href={defaultBanner?.link} target="_blank" rel="noopener noreferrer">
          <StyledBanner image={defaultBanner?.desktop?.url} />
        </a>
      )}
    </>
  )
}

const StyledBanner = styled.div<{ image: string }>`
  width: 360px;
  height: 64px;
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 120px;
    width: 680px;
  }
  margin-bottom: 20px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

export default SwapBanner
