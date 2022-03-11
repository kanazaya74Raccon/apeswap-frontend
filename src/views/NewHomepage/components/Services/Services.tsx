import React, { useEffect, useState } from 'react'
import { Flex, Skeleton, Text } from '@apeswapfinance/uikit'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import useWindowSize from 'hooks/useDimensions'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { ServiceWrapper, YieldCard, ColorWrap, Bubble } from './styles'
import { defaultServiceData } from './defaultServiceData'

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
    <>
      <div ref={observerRef} />
      <ColorWrap>
        <ServiceWrapper>
          {loadServices ? (
            width < 1488 ? (
              <Swiper
                id="serviceSwiper"
                initialSlide={0}
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                loopedSlides={defaultServiceData.length}
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
                                  pl="20px"
                                  style={{
                                    width: '100%',
                                    height: '70px',
                                    background: 'rgba(250, 250, 250, .25)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <ServiceTokenDisplay token1="BANANA" token2="BANANA" />
                                  <Flex pl="20px" justifyContent="center" flexDirection="column">
                                    <Text bold style={{ width: '100%', color: 'white' }}>
                                      BANANA
                                    </Text>
                                    <Text style={{ width: '100%', color: 'white' }}>APR: 120.20%</Text>
                                  </Flex>
                                </Flex>
                                <Flex
                                  mt="5px"
                                  mb="5px"
                                  pl="20px"
                                  style={{
                                    width: '100%',
                                    height: '70px',
                                    background: 'rgba(250, 250, 250, .25)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <ServiceTokenDisplay token1="BANANA" token2="BANANA" />
                                  <Flex pl="20px" justifyContent="center" flexDirection="column">
                                    <Text bold style={{ width: '100%', color: 'white' }}>
                                      BANANA
                                    </Text>
                                    <Text style={{ width: '100%', color: 'white' }}>APR: 120.20%</Text>
                                  </Flex>
                                </Flex>
                                <Flex
                                  mt="5px"
                                  mb="5px"
                                  pl="20px"
                                  style={{
                                    width: '100%',
                                    height: '70px',
                                    background: 'rgba(250, 250, 250, .25)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <ServiceTokenDisplay token1="BANANA" token2="BANANA" />
                                  <Flex pl="20px" justifyContent="center" flexDirection="column">
                                    <Text bold style={{ width: '100%', color: 'white' }}>
                                      BANANA
                                    </Text>
                                    <Text style={{ width: '100%', color: 'white' }}>APR: 120.20%</Text>
                                  </Flex>
                                </Flex>
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
                              pl="20px"
                              style={{
                                width: '100%',
                                height: '70px',
                                background: 'rgba(250, 250, 250, .25)',
                                borderRadius: '10px',
                              }}
                            >
                              <ServiceTokenDisplay token1="BANANA" token2="BANANA" />
                              <Flex pl="20px" justifyContent="center" flexDirection="column">
                                <Text bold style={{ width: '100%', color: 'white' }}>
                                  BANANA
                                </Text>
                                <Text style={{ width: '100%', color: 'white' }}>APR: 120.20%</Text>
                              </Flex>
                            </Flex>
                            <Flex
                              mt="5px"
                              mb="5px"
                              pl="20px"
                              style={{
                                width: '100%',
                                height: '70px',
                                background: 'rgba(250, 250, 250, .25)',
                                borderRadius: '10px',
                              }}
                            >
                              <ServiceTokenDisplay token1="BANANA" token2="BANANA" />
                              <Flex pl="20px" justifyContent="center" flexDirection="column">
                                <Text bold style={{ width: '100%', color: 'white' }}>
                                  BANANA
                                </Text>
                                <Text style={{ width: '100%', color: 'white' }}>APR: 120.20%</Text>
                              </Flex>
                            </Flex>
                            <Flex
                              mt="5px"
                              mb="5px"
                              pl="20px"
                              style={{
                                width: '100%',
                                height: '70px',
                                background: 'rgba(250, 250, 250, .25)',
                                borderRadius: '10px',
                              }}
                            >
                              <ServiceTokenDisplay token1="BANANA" token2="BANANA" />
                              <Flex pl="20px" justifyContent="center" flexDirection="column">
                                <Text bold style={{ width: '100%', color: 'white' }}>
                                  BANANA
                                </Text>
                                <Text style={{ width: '100%', color: 'white' }}>APR: 120.20%</Text>
                              </Flex>
                            </Flex>
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
            [...Array(4)].map(() => {
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
    </>
  )
}

export default React.memo(Services)
