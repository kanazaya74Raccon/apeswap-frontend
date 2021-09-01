import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import { useFetchHeadersHome } from 'state/strapi/fetchStrapi'

const Header = styled.div<{ image: string }>`
  position: relative;
  height: 320px;
  width: 96.5%;
  padding-top: 36px;
  margin-bottom: 30px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  transition: all 1s ease-in-out;
  -webkit-transition: all 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`

const LeftArrow = styled.img`
  position: absolute;
  left: 15px;
  width: 20px;
  border-radius: 0px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
`

const RightArrow = styled.img`
  position: absolute;
  right: 15px;
  height: 24px;
  width: 20px;
  border-radius: 0px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
`

const CurrentHeaderHolder = styled.div`
  display: flex;
  width: auto;
  height: 22px;
  margin-top: 235px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
`

const HeaderBubble = styled.div<{ live?: boolean }>`
  height: 14px;
  width: 14px;
  border-radius: 10px;
  margin-left: 7.5px;
  margin-right: 7.5px;
  cursor: pointer;
  z-index: 1;
  background: ${(props) => (props.live ? 'white' : 'rgba(255, 255, 255, 0.38)')};
`

const LinkArea = styled.a`
  position: absolute;
  height: 270px;
  width: 92%;
  width: 85%;
  top: 0;
  align-self: center;
  cursor: pointer;
  z-index: 1;
`

const SLIDETIME = 15000

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { headersData, loading } = useFetchHeadersHome()
  const { isXl, isLg, isMd } = useMatchBreakpoints()
  const timeoutRef = useRef(null)

  const getImageSize = (image: any) => {
    if (isXl) {
      return image.tablet[0]?.url
    }
    if (isMd || isLg) {
      return image.tablet[0]?.url
    }
    return image.mobile[0]?.url
  }

  const handleRightClick = () => {
    if (activeIndex + 1 === headersData.length) {
      setActiveIndex(0)
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }
  const handleLeftClick = () => {
    if (activeIndex - 1 < 0) {
      setActiveIndex(headersData.length - 1)
    } else {
      setActiveIndex(activeIndex - 1)
    }
  }
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setActiveIndex((prevIndex) => (prevIndex === headersData.length - 1 ? 0 : prevIndex + 1)),
      SLIDETIME,
    )
    return () => {
      resetTimeout()
    }
  }, [activeIndex, headersData])


  return (
    <>
      {loading ? (
        <Header image="" />
      ) : (
        <Header image={getImageSize(headersData[activeIndex])}>
          <LinkArea href={headersData[activeIndex]?.link} target="_blank" rel="noopener noreferrer" />
          <RightArrow src="images/home-right-arrow.svg" onClick={handleRightClick} />
          <LeftArrow src="images/home-left-arrow.svg" onClick={handleLeftClick} />
          <CurrentHeaderHolder>
            {[...Array(headersData.length)].map((e, i) => (
              <HeaderBubble live={i === activeIndex} onClick={() => setActiveIndex(i)} />
            ))}
          </CurrentHeaderHolder>
        </Header>
      )}
    </>
  )
}

export default Banner
