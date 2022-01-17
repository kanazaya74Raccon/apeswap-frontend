import React from 'react'
import { useFetchSwapBanners } from 'state/strapi/fetchStrapi'
import { useLocation, useHistory } from 'react-router-dom'
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

  return (
    <>
      {bannerToDisplay && (
        <a href={bannerToDisplay?.link} target="_blank" rel="noopener noreferrer">
          <StyledBanner image={bannerToDisplay?.desktop?.url} />
        </a>
      )}
    </>
  )
}

const StyledBanner = styled.div<{ image: string }>`
  height: 120px;
  width: 360px;
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
  }
  margin-bottom: 20px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

export default SwapBanner
