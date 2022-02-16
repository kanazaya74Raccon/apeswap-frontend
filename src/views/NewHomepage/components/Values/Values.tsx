import React, { useState } from 'react'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import { ValueCard, ValueImage, ValuesWrapper } from './styles'
import { defaultValues } from './defaultValues'

const SLIDE_DELAY = 5000
SwiperCore.use([Autoplay])

const Values: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const swiperFlag = isMd || isSm || isXs

  const slideNewsNav = (index: number) => {
    setActiveSlide(index - 1)
    swiper.slideTo(defaultValues.length + index)
    swiper.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(
      event.activeIndex - defaultValues.length === defaultValues.length ? 0 : event.activeIndex - defaultValues.length,
    )
  }

  return (
    <ValuesWrapper>
      {swiperFlag ? (
        <Swiper
          initialSlide={defaultValues.length}
          autoplay={{
            delay: SLIDE_DELAY,
            disableOnInteraction: false,
          }}
          loop
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView="auto"
          loopedSlides={defaultValues.length}
          centeredSlides
          onSlideChange={handleSlide}
        >
          {defaultValues.map((value) => {
            return (
              <SwiperSlide style={{ maxWidth: '338px', minWidth: '338px' }} key={value.title}>
                <ValueCard key={value.title}>
                  <ValueImage />
                  <Text fontSize="25px" bold>
                    {value.title}
                  </Text>
                  <Text textAlign="center">{value.description}</Text>
                </ValueCard>
              </SwiperSlide>
            )
          })}
        </Swiper>
      ) : (
        defaultValues.map((value) => {
          return (
            <ValueCard key={value.title}>
              <ValueImage />
              <Text fontSize="25px" bold>
                {value.title}
              </Text>
              <Text textAlign="center">{value.description}</Text>
            </ValueCard>
          )
        })
      )}
    </ValuesWrapper>
  )
}

export default Values
