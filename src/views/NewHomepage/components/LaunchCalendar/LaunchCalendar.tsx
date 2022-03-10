import React, { useEffect, useState } from 'react'
import { Flex, Skeleton, Text } from '@apeswapfinance/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import SwiperCore from 'swiper'
import { useFetchHomepageLaunchCalendar, useHomepageLaunchCalendar } from 'state/hooks'
import useSwiper from 'hooks/useSwiper'
import {
  Bubble,
  CalendarImg,
  ColorWrap,
  LaunchCalendarWrapper,
  LaunchCard,
  LaunchText,
  SkeletonWrapper,
} from './styles'

const LaunchCalendar: React.FC = () => {
  const [loadNews, setLoadNews] = useState(false)
  useFetchHomepageLaunchCalendar(loadNews)
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const launchCal = useHomepageLaunchCalendar()
  const launchCalLength = launchCal?.length || 0
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper.slideTo(launchCalLength + index)
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex - launchCalLength === launchCalLength ? 0 : event.activeIndex - launchCalLength)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadNews(true)
    }
  }, [isIntersecting])

  return (
    <ColorWrap>
      <LaunchCalendarWrapper>
        <LaunchText bold>Launch Calendar</LaunchText>
        <Flex justifyContent="space-around" style={{ width: '100%', overflow: 'hidden' }} ref={observerRef}>
          {launchCal ? (
            <Swiper
              initialSlide={0}
              onSwiper={setSwiper}
              spaceBetween={20}
              slidesPerView="auto"
              loopedSlides={launchCalLength}
              loop
              centeredSlides
              resizeObserver
              lazy
              preloadImages={false}
              onSlideChange={handleSlide}
              breakpoints={{
                480: {
                  centeredSlides: false,
                },
              }}
            >
              {launchCal?.map((launch) => {
                const date = new Date(launch.launchTime)
                return (
                  <SwiperSlide style={{ maxWidth: '219px', minWidth: '219px' }}>
                    <LaunchCard>
                      <Flex justifyContent="center" alignItems="center" flexDirection="column">
                        <Text fontSize="30px" bold>
                          {date.getDate()} {date.toDateString().split(' ')[1]}
                        </Text>
                        <Text fontSize="12px">
                          {date.getUTCHours()}:{date.getUTCMinutes()} UTC
                        </Text>
                      </Flex>
                      <Flex
                        mt="10px"
                        justifyContent="space-around"
                        alignItems="center"
                        flexDirection="row"
                        style={{ display: 'flex' }}
                      >
                        <CalendarImg image={launch.image1?.url} />
                        {launch?.image2 && <CalendarImg image={launch.image2?.url} />}
                      </Flex>
                      <Flex
                        mt="10px"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ display: 'flex' }}
                      >
                        <Text>{launch.textLine1}</Text>
                        {launch?.textLine2 && <Text>{launch.textLine2}</Text>}
                        {launch?.textLine3 && <Text>{launch.textLine3}</Text>}
                      </Flex>
                    </LaunchCard>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            <SkeletonWrapper>
              {[...Array(6)].map(() => {
                return <Skeleton width="219px" height="219px" />
              })}
            </SkeletonWrapper>
          )}
        </Flex>
        <Flex
          justifyContent="center"
          alignContent="center"
          style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
        >
          {[...Array(launchCalLength)].map((i) => {
            return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
          })}
        </Flex>
      </LaunchCalendarWrapper>
    </ColorWrap>
  )
}

export default LaunchCalendar
