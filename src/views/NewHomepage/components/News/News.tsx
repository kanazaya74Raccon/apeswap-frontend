import React, { useEffect, useState } from 'react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { Flex, Skeleton } from '@apeswapfinance/uikit'
import { useFetchHomepageNews, useHomepageNews } from 'state/hooks'
import { Bubble, NewsCard, NewsWrapper, SkeletonWrapper } from './styles'

const SLIDE_DELAY = 5000

SwiperCore.use([Autoplay])

const News: React.FC = () => {
  const [loadImages, setLoadImages] = useState(false)
  useFetchHomepageNews(loadImages)
  const fetchedNews = useHomepageNews()
  const sortedNews = fetchedNews
  const newsLength = fetchedNews?.length || 0
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index - 1)
    swiper.slideTo(newsLength + index)
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex - newsLength === newsLength ? 0 : event.activeIndex - newsLength)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadImages(true)
    }
  }, [isIntersecting])

  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ position: 'relative', width: '100%' }}
      >
        <NewsWrapper>
          <Flex justifyContent="space-between" style={{ width: '100%', overflow: 'hidden' }} ref={observerRef}>
            {fetchedNews ? (
              <Swiper
                autoplay={{
                  delay: SLIDE_DELAY,
                  disableOnInteraction: false,
                }}
                loop
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                loopedSlides={newsLength}
                centeredSlides
                resizeObserver
                lazy
                preloadImages={false}
                onSlideChange={handleSlide}
              >
                {sortedNews?.map((news) => {
                  return (
                    <SwiperSlide style={{ maxWidth: '266px', minWidth: '266px' }}>
                      <NewsCard
                        index={activeSlide}
                        image={news?.cardImageUrl?.url}
                        key={news?.cardImageUrl?.url}
                        listLength={newsLength}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              <SkeletonWrapper>
                {[...Array(5)].map(() => {
                  return <Skeleton width="266px" height="348px" />
                })}
              </SkeletonWrapper>
            )}
          </Flex>
        </NewsWrapper>
        {loadImages && (
          <Flex justifyContent="center" alignContent="center" style={{ position: 'absolute', bottom: '50px' }}>
            {[...Array(newsLength)].map((_, i) => {
              return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
            })}
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default React.memo(News)
