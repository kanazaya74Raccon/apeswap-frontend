import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { NavLink } from 'react-router-dom'

const StyledPromoCard = styled(Card)`
  text-align: center;
  width: 100vw !important;
  margin-left: -16px;
  border-radius: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 32px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 32px;
  }
`

const StyledDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
  }
`

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  color: #ffb300;
  display: block;
  margin-top: 20px;
`

const StyledCarousel = styled(Carousel)`
  .control-dots {
    position: absolute;
    bottom: 34px;
  }

  .carousel .control-dots .dot {
    opacity: 0.3;
    width: 14px;
    height: 14px;
    background-color: #ffb300;
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 50%;
    border: 0;
    outline: none;
    box-shadow: none;
  }

  .carousel .slider-wrapper.axis-horizontal .slider .slide {
    margin-top: auto;
    margin-bottom: auto;
  }

  .carousel.carousel-slider {
    height: 100%;
  }

  .carousel-root {
    width: 100%;
  }

  .carousel .slider-wrapper {
    ${({ theme }) => theme.mediaQueries.md} {
      max-width: 450px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      max-width: 500px;
    }
    max-width: 380px;
    max-height: 260px;
  }
`

const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0px;
    margin-bottom: 12px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const StyledClickRight = styled.img`
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  cursor: 'pointer';
  padding: 80px 15px;
  z-index: 100;

  ${({ theme }) => theme.mediaQueries.sm} {
    right: 22px;
    padding: 80px 10px;
  }
`

const StyledClickLeft = styled.img`
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  cursor: 'pointer';
  padding: 80px 15px;
  z-index: 100;

  ${({ theme }) => theme.mediaQueries.sm} {
    left: 22px;
    padding: 80px 10px;
  }
`

const carouselSlidesData = [
  {
    header: '🚀  May the IAO be with you 🚀 ',
    text: '🌑 This time we are taking you to a galaxy far far away with JediYield 🌑',
    text2: 'Launching Apr. 2, 03:00 UTC',
    link: 'Check it out!',
    pageLink: 'iao',
  },
  {
    header: 'NFA',
    text:
      'Who is ready for some NFAs, Who is ready for some NFAs,Who is ready for some NFAs, Who is ready for some NFAs, Who is ready for some NFAs',
    text2: 'Launching April',
    link: 'Check it out!',
    pageLink: 'iao',
  },
  {
    header: 'New Partnership',
    text: 'Check out the new partnership',
    text2: 'Launching Tomorrow',
    link: 'Check it out!',
    pageLink: 'iao',
  },
]

const PromoCard = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToPrevSlide = () => {
    let index = activeIndex
    if (index >= 1) {
      --index
    } else {
      index = carouselSlidesData.length -1
    }
    setActiveIndex(index)
  }

  const goToNextSlide = () => {
    const slidesLength = carouselSlidesData.length - 1
    let index = activeIndex
    if (activeIndex < slidesLength) {
      ++index
    } else {
      index = 0;
    }
    setActiveIndex(index)
  }

  return (
    <StyledPromoCard>
      <CarouselLeftArrow onClick={() => goToPrevSlide()} />
      <StyledDivContainer>
        {carouselSlidesData && (
          <StyledCarousel infiniteLoop autoPlay selectedItem={activeIndex} showStatus={false} showArrows={false}>
            {carouselSlidesData.map((slide) => (
              <CarouselSlide slide={slide} />
            ))}
          </StyledCarousel>
        )}
      </StyledDivContainer>
      <CarouselRightArrow onClick={() => goToNextSlide()} />
    </StyledPromoCard>
  )
}

export default PromoCard

const CarouselLeftArrow = ({ onClick }) => {
  return (
    <StyledClickLeft
      width="45px"
      role="presentation"
      src="/images/leftArrow.svg"
      alt="leftArrow"
      onClick={onClick}
    />
  )
}

const CarouselRightArrow = ({ onClick }) => {
  return (
    <StyledClickRight
      width="45px"
      role="presentation"
      src="/images/rightArrow.svg"
      alt="rightArrow"
      onClick={onClick}
    />
  )
}

const CarouselSlide = ({ slide }) => {
  return (
    <NavLink to={`${slide.link}`}>
      <CardBody>
        <Heading size="lg" mb="24px">
          {`${slide.header}`}
        </Heading>
        <StyledDiv>
          <Text color="textSubtle" fontFamily="poppins">{`${slide.text}`}</Text>
          <Text color="textSubtle" fontFamily="poppins">{`${slide.text2}`}</Text>
          <Text color="textSubtle">
            <StyledNavLink to={`${slide.link}`}>{`${slide.link}`}</StyledNavLink>
          </Text>
        </StyledDiv>
      </CardBody>
    </NavLink>
  )
}
