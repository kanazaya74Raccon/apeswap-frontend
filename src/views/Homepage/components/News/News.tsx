import React, { useEffect, useState } from 'react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import { orderBy } from 'lodash'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { Flex, Skeleton } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFetchHomepageNews, useHomepageNews } from 'state/hooks'
import track from 'utils/track'
import { Bubble, NewsCard, NewsWrapper, SkeletonWrapper } from './styles'

const SLIDE_DELAY = 5000

SwiperCore.use([Autoplay])

const News: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const [loadImages, setLoadImages] = useState(false)
  useFetchHomepageNews(loadImages)
  const today = new Date()
  const fetchedNews = useHomepageNews()
  const sortedNews = orderBy(fetchedNews, 'CardPosition')
  const filterNews = sortedNews?.filter(
    (news) =>
      (new Date(news.StartTime) <= today && new Date(news.EndTime) > today) || (!news.StartTime && !news.EndTime),
  )
  const newsLength = filterNews?.length || 0
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
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

  const trackBannersClick = (bannerId: number, clickUrl: string, chainIdentifier: string | number) => {
    track({
      event: 'newsClick',
      chain: chainIdentifier,
      data: {
        banner: bannerId,
        clickUrl,
      },
    })
  }

  return (
    <>
      <div ref={observerRef} />
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ position: 'relative', width: '100%' }}
      >
        <NewsWrapper>
          <Flex justifyContent="space-between" style={{ width: '100%', overflow: 'hidden' }}>
            {filterNews?.length > 0 ? (
              <Swiper
                id="newsSwiper"
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
                {filterNews?.map((news, index) => {
                  return (
                    <SwiperSlide style={{ maxWidth: '266px', minWidth: '266px' }} key={news.id}>
                      <a href={news?.CardLink} target="_blank" rel="noopener noreferrer">
                        <NewsCard
                          index={activeSlide}
                          image={news?.cardImageUrl?.url}
                          key={news?.cardImageUrl?.url}
                          listLength={newsLength}
                          onClick={() => trackBannersClick(index + 1, news?.CardLink, chainId)}
                        />
                      </a>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              <SkeletonWrapper>
                {[...Array(5)].map(() => {
                  return <Skeleton width="266px" height="332.5px" />
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
