import React from 'react'
import { useFetchSwapBanners } from 'state/strapi/fetchStrapi'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import { Flex } from '@apeswapfinance/uikit'
import 'swiper/swiper.min.css'
import { useLocation } from 'react-router-dom'

const SLIDE_DELAY = 10000

SwiperCore.use([Autoplay])

const SwapBanner: React.FC = () => {
  const banners = useFetchSwapBanners()
  const location = useLocation()

  const customBanner = banners?.swapBannersData?.find((banner) => {
    if (location.search.includes(`banner=${banner?.param}`)) {
      return banner
    }
    return null
  })

  const carouselBanners = banners?.swapBannersData?.filter((banner) => banner.param === 'carousel')

  const defaultBanner = banners?.swapBannersData?.find((banner) => {
    if (banner?.param === 'default') {
      return banner
    }
    return null
  })

  return (
    <>
      <BannerWrapper>
        <Flex justifyContent="space-between" style={{ width: '100%', overflow: 'hidden' }}>
          {customBanner ? (
            <a href={customBanner?.link} target="_blank" rel="noopener noreferrer">
              <StyledBanner image={customBanner?.desktop?.url} />
            </a>
          ) : carouselBanners?.length > 0 ? (
            <Swiper
              id="dexSwiper"
              autoplay={{
                delay: SLIDE_DELAY,
                disableOnInteraction: false,
              }}
              loop
              spaceBetween={20}
              slidesPerView="auto"
              loopedSlides={carouselBanners?.length}
              centeredSlides
              resizeObserver
              lazy
              preloadImages={false}
            >
              {carouselBanners?.map((banner) => {
                return (
                  <SwiperSlide key={banner.desktop.id}>
                    <a href={banner?.link} target="_blank" rel="noopener noreferrer">
                      <StyledBanner image={banner?.desktop?.url} key={banner?.desktop?.url} />
                    </a>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            <a href={defaultBanner?.link} target="_blank" rel="noopener noreferrer">
              <StyledBanner image={defaultBanner?.desktop?.url} />
            </a>
          )}
        </Flex>
      </BannerWrapper>
    </>
  )
}

const StyledBanner = styled.div<{ image: string }>`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
    height: 120px;
  }
  width: 360px;
  height: 64px;
  opacity: 1;
  flex-shrink: 1;
  border-radius: 20px;
  transition: ease 1000ms;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`

export const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 360px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
  }
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 20px;
`

export default React.memo(SwapBanner)
