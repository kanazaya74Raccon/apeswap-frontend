import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

const Header = styled.div`
  position: relative;
  height: 240px;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  background-image: url(/images/auction-banner.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 320px;
    width: 100%;
  }
`

const Banner = () => {
  const TranslateString = useI18n()

  return (
    <>
      <Header />
    </>
  )
}

export default Banner
