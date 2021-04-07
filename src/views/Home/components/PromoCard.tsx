import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import { NavLink } from 'react-router-dom'

interface ToRenderProps {
  active: boolean
}

interface ButtonProps {
  active: boolean
}

const StyledIndexCard = styled.li<ToRenderProps>`
  display: ${({ active }) => (active ? 'block' : 'none')};
`

const StyledButton = styled.button<ButtonProps>`
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  width: 14px;
  height: 14px;
  background-color: #ffb300;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 50%;
  border: 0;
  outline: none;
`

const StyledPromoCard = styled(Card)`
  text-align: center;
`

const StyledDiv = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  color: #ffb300;
  display: block;
`

const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
`

const StyledClickRight = styled.img`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
`

const StyledClickLeft = styled.img`
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
`

const PromoCard = () => {
  return (
    <StyledPromoCard>
      <Carousel slides={carouselSlidesData} />
    </StyledPromoCard>
  )
}

export default PromoCard

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
    text: 'Who is ready for some NFAs',
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

const CarouselLeftArrow = ({ onClick }) => {
  return (
    <StyledClickLeft width="25px" role="presentation" src="/images/leftArrow.svg" alt="leftArrow" onClick={onClick} />
  )
}

const CarouselRightArrow = ({ onClick }) => {
  return (
    <StyledClickRight
      width="25px"
      role="presentation"
      src="/images/rightArrow.svg"
      alt="rightArrow"
      onClick={onClick}
    />
  )
}

const CarouselIndicator = ({ index, activeIndex, onClick }) => {
  return <StyledButton active={index === activeIndex} onClick={onClick} />
}

const CarouselSlide = ({ index, activeIndex, slide }) => {
  return (
    <StyledIndexCard active={index === activeIndex}>
      <NavLink to={`${slide.link}`}>
        <CardBody>
          <Heading size="lg" mb="24px">
            {`${slide.header}`}
          </Heading>
          <>
            <Text color="textSubtle">{`${slide.text}`}</Text>
            <Text color="textSubtle">{`${slide.text2}`}</Text>
            <Text color="textSubtle">
              <StyledNavLink to={`${slide.link}`}>{`${slide.link}`}</StyledNavLink>
            </Text>
          </>
        </CardBody>
      </NavLink>
    </StyledIndexCard>
  )
}

const Carousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  const goToPrevSlide = () => {
    const slidesLength = slides.length
    let index = activeIndex
    if (index < 1) {
      index = slidesLength
    }

    --index

    setActiveIndex(index)
  }

  const goToNextSlide = () => {
    const slidesLength = slides.length - 1
    let index = activeIndex

    if (activeIndex === slidesLength) {
      index = -1
    }

    ++index

    setActiveIndex(index)
  }

  return (
    <>
      <CarouselLeftArrow onClick={() => goToPrevSlide()} />
      <StyledDiv>
        {slides.map((slide, index) => (
          <CarouselSlide
            // key={index}
            index={index}
            activeIndex={activeIndex}
            slide={slide}
          />
        ))}
      </StyledDiv>
      <StyledDivContainer>
        {slides.map((_, index) => (
          <CarouselIndicator index={index} activeIndex={activeIndex} onClick={() => goToSlide(index)} />
        ))}
      </StyledDivContainer>
      <CarouselRightArrow onClick={() => goToNextSlide()} />
    </>
  )
}
