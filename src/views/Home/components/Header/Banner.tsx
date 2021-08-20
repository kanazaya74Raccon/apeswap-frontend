import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useFetchHeadersHome } from 'state/strapi/fetchStrapi'
import { useCurrentTime } from 'hooks/useTimer'
import getTimePeriods from 'utils/getTimePeriods'

const Header = styled.div<{ image: string }>`
  position: relative;
  height: 240px;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 1s ease-in-out;
  -webkit-transition: all 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 320px;
    width: 100%;
  }
`

const LeftArrow = styled.img`
  position: absolute;
  left: 10px;
  height: 24px;
  width: 20px;
  border-radius: 0px;
  transform: translateY(-50%);
  cursor: pointer;
`

const RightArrow = styled.img`
  position: absolute;
  right: 10px;
  height: 24px;
  width: 20px;
  border-radius: 0px;
  transform: translateY(-50%);
  cursor: pointer;
`

const CurrentHeaderHolder = styled.div`
  display: flex;
  margin-top: 235px;
  width: auto;
  height: 22px;
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
  background: ${(props) => (props.live ? 'white' : 'rgba(255, 255, 255, 0.38)')};
`

const SLIDETIME = 20000

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { headersData, loading } = useFetchHeadersHome()
  const timeoutRef = useRef(null)

  const getImageSize = (image: any) => {
    return image.desktop[0].url
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
          <LeftArrow src="images/home-left-arrow.svg" onClick={handleLeftClick} />
          <RightArrow src="images/home-right-arrow.svg" onClick={handleRightClick} />
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
