import React, { useEffect, useState } from 'react'
import { Flex, Skeleton, Text } from '@apeswapfinance/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import SwiperCore from 'swiper'
import { useFetchHomepageLaunchCalendar, useHomepageLaunchCalendar } from 'state/hooks'
import { useTheme } from 'styled-components'
import useSwiper from 'hooks/useSwiper'
import { QuestionMark } from 'components/Icons'
import { useTranslation } from 'contexts/Localization'
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
  const today = new Date()
  today.setHours(today.getHours() - 6)
  useFetchHomepageLaunchCalendar(loadNews)
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const theme = useTheme()
  const launchCal = useHomepageLaunchCalendar()
  const sortLaunch = launchCal?.filter((launch) => new Date(launch.launchTime) > today)
  const launchCalLength = sortLaunch?.length || 0
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { t } = useTranslation()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper.slideTo(index)
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadNews(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <ColorWrap>
        <LaunchCalendarWrapper>
          <LaunchText bold>{t('Launch Calendar')}</LaunchText>
          <Flex justifyContent="space-around" style={{ width: '100%', overflow: 'hidden' }}>
            {sortLaunch ? (
              <Swiper
                id="launchSwiper"
                initialSlide={0}
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                resizeObserver
                centeredSlides
                lazy
                preloadImages={false}
                onSlideChange={handleSlide}
                breakpoints={{
                  480: {
                    centeredSlides: false,
                  },
                }}
              >
                {sortLaunch?.map((launch, i) => {
                  const date = new Date(launch.launchTime)
                  const slide = (
                    <SwiperSlide style={{ maxWidth: '219px', minWidth: '219px' }} key={launch?.textLine1}>
                      <LaunchCard>
                        <Flex justifyContent="center" alignItems="center" flexDirection="column">
                          <Text fontSize="30px" bold>
                            {date.getUTCDate()} {date.toUTCString().split(' ')[2]}
                          </Text>
                          <Text fontSize="12px">
                            {date.getUTCHours()}:{date?.getUTCMinutes() === 0 ? '00' : date?.getUTCMinutes()} UTC
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

                  if (i === launchCalLength - 1) {
                    return (
                      <>
                        {slide}
                        <SwiperSlide style={{ maxWidth: '219px', minWidth: '219px' }} key={launch?.textLine1}>
                          <LaunchCard>
                            <Flex alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                              <QuestionMark fill={theme.colors.text} />
                            </Flex>
                          </LaunchCard>
                        </SwiperSlide>
                      </>
                    )
                  }
                  return slide
                })}
              </Swiper>
            ) : (
              <SkeletonWrapper>
                {[...Array(6)].map(() => {
                  return <Skeleton width="219px" height="219px" key="id" />
                })}
              </SkeletonWrapper>
            )}
          </Flex>
          <Flex
            justifyContent="center"
            alignContent="center"
            style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
          >
            {[...Array(launchCalLength + 1)].map((_, i) => {
              return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
            })}
          </Flex>
        </LaunchCalendarWrapper>
      </ColorWrap>
    </>
  )
}

export default LaunchCalendar
