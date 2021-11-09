import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import { useFetchHeadersHome } from 'state/strapi/fetchStrapi'
import { useNetworkChainId } from 'state/hooks'
import { NETWORK_LABEL } from 'config/constants/chains'

const Header = styled.div<{ image: string }>`
  position: relative;
  width: 96%;
  height: 300px;
  padding-top: 36px;
  padding-bottom: 15px;
  margin-bottom: 30px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: all 1s ease-in-out;
  -webkit-transition: all 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
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
  width: 98%;
  top: 0;
  align-self: center;
  cursor: pointer;
  z-index: 1;
`

const SLIDETIME = 6000

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const chainId = useNetworkChainId()
  const { headersData, loading } = useFetchHeadersHome()
  const filteredBanners = headersData.filter((banner) => !banner?.chain || banner?.chain === NETWORK_LABEL[chainId])
  const { isXl, isLg, isMd } = useMatchBreakpoints()
  const timeoutRef = useRef(null)

  const getImageSize = (image: any) => {
    if (isXl) {
      return image?.desktop[0]?.url
    }
    if (isMd || isLg) {
      return image?.tablet[0]?.url
    }
    return image?.mobile[0]?.url
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setActiveIndex((prevIndex) => (prevIndex === filteredBanners.length - 1 ? 0 : prevIndex + 1)),
      SLIDETIME,
    )
    return () => {
      resetTimeout()
    }
  }, [activeIndex, filteredBanners])

  useEffect(() => {
    setActiveIndex(0)
  }, [chainId])

  return (
    <>
      {loading ? (
        <Header image="" />
      ) : (
        <Header image={getImageSize(filteredBanners[activeIndex])}>
          <LinkArea href={filteredBanners[activeIndex]?.link} target="_blank" rel="noopener noreferrer" />
          <CurrentHeaderHolder>
            {[...Array(filteredBanners?.length)].map((e, i) => (
              <HeaderBubble live={i === activeIndex} onClick={() => setActiveIndex(i)} key={filteredBanners[i]?.link} />
            ))}
          </CurrentHeaderHolder>
        </Header>
      )}
    </>
  )
}

export default Banner
