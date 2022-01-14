import React from 'react'
import useMedia from 'use-media'
import { SwiperSlide } from 'swiper/react'

import { pastIfos } from 'config/constants/ifo'
import {
  Container,
  Box,
  ProjectImage,
  ArrowImage,
  StatusTitle,
  LeftArrowIcon,
  RightArrowIcon,
  ProjectSwiper,
} from './styles'

import 'swiper/swiper.min.css'

const padLeadingZeros = (num: number, size: number) => {
  let s = num.toString()
  while (s.length < size) s = `0${s}`
  return s
}

interface Props {
  onSelectProject: (id: string) => unknown
}

const IfoPastProjectSwiper = ({ onSelectProject }: Props) => {
  const isWide = useMedia({ minWidth: '576px' })
  const [swiperRef, setSwiperRef] = React.useState<any>(null)

  const handleClickPrev = () => {
    swiperRef.slidePrev()
  }
  const handleClickNext = () => {
    swiperRef.slideNext()
  }

  const handleSlideChange = (index: number) => {
    const id = pastIfos[index]?.id

    if (!id) {
      console.warn('Selected past IFO project id is either undefined or an empty string')
    } else {
      onSelectProject(id)
    }
  }

  return (
    <Container>
      <ArrowImage onClick={handleClickPrev}>
        <LeftArrowIcon />
      </ArrowImage>
      <ProjectSwiper
        onSwiper={setSwiperRef}
        onSlideChange={(w) => handleSlideChange(w.activeIndex)}
        slidesPerView={isWide ? 5 : 3}
        centeredSlides
        spaceBetween={isWide ? 30 : 10}
        pagination={{
          type: 'fraction',
        }}
        navigation
      >
        {pastIfos.map((ifo, index) => (
          <SwiperSlide key={ifo.id}>
            {({ isActive }) => (
              <Box>
                <ProjectImage
                  src={`/images/ifos/${ifo.id}.svg`}
                  alt={ifo.id}
                  width="60px"
                  height="60px"
                  isActive={isActive}
                />

                <StatusTitle marginTop={16} isActive={isActive}>
                  {ifo.name}
                </StatusTitle>
                <StatusTitle>{`#${padLeadingZeros(pastIfos.length - index, 3)}`}</StatusTitle>
              </Box>
            )}
          </SwiperSlide>
        ))}
      </ProjectSwiper>
      <ArrowImage onClick={handleClickNext}>
        <RightArrowIcon />
      </ArrowImage>
    </Container>
  )
}

export default IfoPastProjectSwiper
