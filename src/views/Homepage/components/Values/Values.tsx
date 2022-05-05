import React, { useEffect, useState } from 'react'
import { Flex, Text, useMatchBreakpoints, Skeleton } from '@apeswapfinance/uikit'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useTranslation } from 'contexts/Localization'
import { Bubble, ValueCard, ValueImage, ValuesWrapper, ValueText } from './styles'
import { defaultValues } from './defaultValues'

const SLIDE_DELAY = 5000
SwiperCore.use([Autoplay])

const Values: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadValues, setLoadValues] = useState(false)
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const swiperFlag = isMd || isSm || isXs

  const slideVal = (index: number) => {
    setActiveSlide(index)
    swiper.slideTo(defaultValues.length + index)
    swiper.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(
      event.activeIndex - defaultValues.length === defaultValues.length ? 0 : event.activeIndex - defaultValues.length,
    )
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadValues(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <ValuesWrapper>
        <ValueText bold> {t('Our Values')} </ValueText>
        <Flex justifyContent="center" style={{ width: '100%' }}>
          {swiperFlag ? (
            <Swiper
              id="valuesSwiper"
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
              {defaultValues(t).map((value) => {
                return (
                  <SwiperSlide style={{ maxWidth: '338px', minWidth: '338px' }} key={value.title}>
                    <ValueCard key={value.title}>
                      {loadValues ? (
                        <ValueImage image={value.logoImg} />
                      ) : (
                        <Skeleton animation="waves" variant="circle" height="200px" width="200px" />
                      )}
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
            defaultValues(t).map((value) => {
              return (
                <ValueCard key={value.title}>
                  {loadValues ? (
                    <ValueImage image={value.logoImg} />
                  ) : (
                    <Skeleton animation="waves" variant="circle" height="200px" width="200px" />
                  )}
                  <Text fontSize="25px" bold>
                    {value.title}
                  </Text>
                  <Text textAlign="center">{value.description}</Text>
                </ValueCard>
              )
            })
          )}
        </Flex>
        <Flex
          justifyContent="center"
          alignContent="center"
          style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
        >
          {[...Array(defaultValues.length)].map((_, i) => {
            return <Bubble isActive={i === activeSlide} onClick={() => slideVal(i)} />
          })}
        </Flex>
      </ValuesWrapper>
    </>
  )
}

export default Values
