import React, { useEffect, useState } from 'react'
import { Flex, Skeleton, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import useWindowSize from 'hooks/useDimensions'
import { ServiceWrapper, YieldCard, ColorWrap, Bubble } from './styles'
import { defaultServiceData } from './defaultServiceData'

const SLIDE_DELAY = 5000

SwiperCore.use([Autoplay])

const Services: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [loadServices, setLoadServices] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { width } = useWindowSize()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index - 1)
    swiper.slideTo(defaultServiceData.length + index)
    swiper.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(
      event.activeIndex - defaultServiceData.length === defaultServiceData.length
        ? 0
        : event.activeIndex - defaultServiceData.length,
    )
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadServices(true)
    }
  }, [isIntersecting])

  return (
    <div ref={observerRef}>
      <ColorWrap>
        <ServiceWrapper>
          {loadServices ? (
            width < 1488 ? (
              <Swiper
                initialSlide={defaultServiceData.length}
                autoplay={{
                  delay: SLIDE_DELAY,
                  disableOnInteraction: false,
                }}
                loop
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                loopedSlides={defaultServiceData.length}
                centeredSlides
                onSlideChange={handleSlide}
              >
                {defaultServiceData.map((service) => {
                  return (
                    <SwiperSlide style={{ maxWidth: '338px', minWidth: '338px' }} key={service.title}>
                      <YieldCard image={service.backgroundImg}>
                        <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                          <Flex flexDirection="column">
                            <Flex>
                              <Text color="white" fontSize="25px" bold>
                                {service.title}
                              </Text>
                            </Flex>
                            <Flex>
                              <Text color="white">{service.description}</Text>
                            </Flex>
                          </Flex>
                          {service.title !== 'Coming Soon' && (
                            <>
                              <Flex
                                flexDirection="column"
                                justifyContent="space-between"
                                style={{ bottom: '40px', height: '250px' }}
                              >
                                <Flex
                                  mt="5px"
                                  mb="5px"
                                  style={{
                                    width: '100%',
                                    height: '70px',
                                    background: 'rgba(250, 250, 250, .25)',
                                    borderRadius: '10px',
                                  }}
                                />
                                <Flex
                                  mt="5px"
                                  mb="5px"
                                  style={{
                                    width: '100%',
                                    height: '70px',
                                    background: 'rgba(250, 250, 250, .25)',
                                    borderRadius: '10px',
                                  }}
                                />
                                <Flex
                                  mt="5px"
                                  mb="5px"
                                  style={{
                                    width: '100%',
                                    height: '70px',
                                    background: 'rgba(250, 250, 250, .25)',
                                    borderRadius: '10px',
                                  }}
                                />
                              </Flex>
                              <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
                                <Text color="white" fontSize="14px">
                                  See All {'>'}
                                </Text>
                              </Flex>
                            </>
                          )}
                        </Flex>
                      </YieldCard>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              defaultServiceData.map((service) => {
                return (
                  <YieldCard image={service.backgroundImg} key={service.title}>
                    <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                      <Flex flexDirection="column">
                        <Flex>
                          <Text color="white" fontSize="25px" bold>
                            {service.title}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text color="white">{service.description}</Text>
                        </Flex>
                      </Flex>
                      {service.title !== 'Coming Soon' && (
                        <>
                          <Flex
                            flexDirection="column"
                            justifyContent="space-between"
                            style={{ bottom: '40px', height: '250px' }}
                          >
                            <Flex
                              mt="5px"
                              mb="5px"
                              style={{
                                width: '100%',
                                height: '70px',
                                background: 'rgba(250, 250, 250, .25)',
                                borderRadius: '10px',
                              }}
                            />
                            <Flex
                              mt="5px"
                              mb="5px"
                              style={{
                                width: '100%',
                                height: '70px',
                                background: 'rgba(250, 250, 250, .25)',
                                borderRadius: '10px',
                              }}
                            />
                            <Flex
                              mt="5px"
                              mb="5px"
                              style={{
                                width: '100%',
                                height: '70px',
                                background: 'rgba(250, 250, 250, .25)',
                                borderRadius: '10px',
                              }}
                            />
                          </Flex>
                          <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
                            <Text color="white" fontSize="14px">
                              See All {'>'}
                            </Text>
                          </Flex>
                        </>
                      )}
                    </Flex>
                  </YieldCard>
                )
              })
            )
          ) : (
            [...Array(4)].map((_, i) => {
              return (
                <YieldCard>
                  <Skeleton height="100%" width="100%" />
                </YieldCard>
              )
            })
          )}
          <Flex
            justifyContent="center"
            alignContent="center"
            style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
          >
            {[...Array(defaultServiceData.length)].map((_, i) => {
              return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
            })}
          </Flex>
        </ServiceWrapper>
      </ColorWrap>
    </div>
  )
}

export default React.memo(Services)
