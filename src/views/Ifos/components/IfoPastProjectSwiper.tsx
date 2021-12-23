import React from 'react'
import styled from 'styled-components'
import { Image, Text } from '@apeswapfinance/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'

import { pastIfos } from 'config/constants/ifo'
import { Ifo } from 'config/constants/types'

import 'swiper/swiper.min.css'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProjectImage = styled.img<{ isActive?: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
`
const ArrowImage = styled.div`
  width: 50px;
  cursor: pointer;
`
const StatusTitle = styled(Text)<{ isActive?: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
`

const padLeadingZeros = (num: number, size: number) => {
  let s = num.toString()
  while (s.length < size) s = `0${s}`
  return s
}

interface Props {
  onSelectProject: (id: string) => unknown
}

const IfoPastProjectSwiper = ({ onSelectProject }: Props) => {
  const [swiperRef, setSwiperRef] = React.useState<any>(null)

  const handleClickPrev = () => {
    swiperRef.slidePrev()
  }
  const handleClickNext = () => {
    swiperRef.slideNext()
  }

  const handleSlideChange = (index: number) => {
    const id = pastIfos[index]?.id
    console.log('handleSlideChange', pastIfos[index], id)

    if (!id) {
      console.warn('Selected past IFO project id is either undefined or an empty string')
    } else {
      onSelectProject(id)
    }
  }

  return (
    <Container>
      <ArrowImage onClick={handleClickPrev}>
        <Image src="/images/left-arrow.svg" alt="Prev" width={24} height={28} />
      </ArrowImage>
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={(w) => handleSlideChange(w.activeIndex)}
        slidesPerView={5}
        centeredSlides
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation
        className="mySwiper"
      >
        {pastIfos.map((ifo, index) => (
          <SwiperSlide key={ifo.id}>
            {({ isActive }) => (
              <Box>
                <ProjectImage
                  src={`/images/ifos/${ifo.id}.svg`}
                  alt={ifo.id}
                  width="64px"
                  height="64px"
                  isActive={isActive}
                />

                <StatusTitle marginTop={16} isActive={isActive}>
                  {ifo.name}
                </StatusTitle>
                <StatusTitle>{`#${padLeadingZeros(index + 1, 3)}`}</StatusTitle>
              </Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <ArrowImage onClick={handleClickNext}>
        <Image src="/images/arrow.svg" alt="Next" width={24} height={28} />
      </ArrowImage>
    </Container>
  )
}

export default IfoPastProjectSwiper
