import React, { useState } from 'react'
import { Flex, Text } from '@apeswapfinance/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import useSwiper from 'hooks/useSwiper'
import { Bubble, CalendarImg, ColorWrap, LaunchCalendarWrapper, LaunchCard, LaunchText } from './styles'
import { launchStubData } from './launchStubData'

const LaunchCalendar: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)

  const slideNewsNav = (index: number) => {
    setActiveSlide(index - 1)
    swiper.slideTo(launchStubData.length + index)
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(
      event.activeIndex - launchStubData.length === launchStubData.length
        ? 0
        : event.activeIndex - launchStubData.length,
    )
  }

  return (
    <ColorWrap>
      <LaunchCalendarWrapper>
        <LaunchText bold>Launch Calendar</LaunchText>
        <Swiper
          initialSlide={0}
          onSwiper={setSwiper}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode
          loop
          loopedSlides={launchStubData.length}
          freeModeSticky
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
          {launchStubData.map((launch) => {
            return (
              <SwiperSlide style={{ maxWidth: '219px', minWidth: '219px' }}>
                <LaunchCard>
                  <Flex justifyContent="center" alignItems="center" flexDirection="column">
                    <Text fontSize="30px" bold>
                      {launch.launchTime.getDate()} {launch.launchTime.toDateString().split(' ')[1]}
                    </Text>
                    <Text fontSize="12px">
                      {launch.launchTime.getUTCHours()}:{launch.launchTime.getUTCMinutes()} UTC
                    </Text>
                  </Flex>
                  <Flex
                    mt="10px"
                    justifyContent="space-around"
                    alignItems="center"
                    flexDirection="row"
                    style={{ display: 'flex' }}
                  >
                    <CalendarImg image={launch.image1} />
                    {launch?.image2 && <CalendarImg image={launch.image2} />}
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
        <Flex
          justifyContent="center"
          alignContent="center"
          style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
        >
          {[...Array(launchStubData.length)].map((_, i) => {
            return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
          })}
        </Flex>
      </LaunchCalendarWrapper>
    </ColorWrap>
  )
}

export default LaunchCalendar
