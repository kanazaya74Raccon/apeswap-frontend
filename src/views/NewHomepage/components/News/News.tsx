import React, { useEffect, useState } from 'react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { Flex, Skeleton } from '@apeswapfinance/uikit'
import { Bubble, NewsCard, NewsWrapper } from './styles'
import { newsStub } from './stubData'

const SLIDE_DELAY = 5000

SwiperCore.use([Autoplay])

const News: React.FC = () => {
  const [loadImages, setLodImages] = useState(false)
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(-1)
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index - 1)
    swiper.slideTo(newsStub.length + index)
    swiper.autoplay.start()
  }

  useEffect(() => {
    if (isIntersecting) {
      setLodImages(true)
    }
  }, [isIntersecting])

  return (
    <div ref={observerRef}>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ position: 'relative', width: '100%' }}
      >
        <NewsWrapper>
          {loadImages ? (
            <Swiper
              autoplay={{
                delay: SLIDE_DELAY,
              }}
              loop
              onSwiper={setSwiper}
              spaceBetween={20}
              slidesPerView="auto"
              loopedSlides={newsStub.length}
              centeredSlides
              resizeObserver
              lazy
              preloadImages={false}
              onSlideChange={() => setActiveSlide((prev) => (prev === newsStub.length - 1 ? 0 : ++prev))}
            >
              {newsStub.map((news, i) => {
                return (
                  <SwiperSlide style={{ maxWidth: '266px', minWidth: '266px' }}>
                    <NewsCard
                      index={activeSlide}
                      image={news?.imageUri}
                      key={news?.link}
                      listLength={newsStub.length}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            <>
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
            </>
          )}
        </NewsWrapper>
        <Flex justifyContent="center" alignContent="center" style={{ position: 'absolute', bottom: '50px' }}>
          {[...Array(newsStub.length)].map((_, i) => {
            return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
          })}
        </Flex>
      </Flex>
    </div>
  )
}

export default React.memo(News)
