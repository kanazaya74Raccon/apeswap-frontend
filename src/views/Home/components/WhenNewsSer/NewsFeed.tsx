import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Card, Text } from '@apeswapfinance/uikit'
import useFetchPromoHome from 'state/strapi/useFetchPromoHome'
import { baseUrlStrapi } from 'hooks/api'

interface NewsContainerProps {
  border: boolean
}

const NewsContainer = styled.div<NewsContainerProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: auto;
  width: 293px;
  shrink: 0;
  margin-left: 10px;
  border-top: ${(props) => props.border && `5px solid ${props.theme.colors.background}`};
`

const BreakLine = styled.div`
  width: 293px;
  margin-left: 10px;
  margin-top: 25px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 293px;
  height: auto;
  align-items: center;
  justify-content: center;
`

const Title = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-align: center;
`

const DescriptionContainer = styled(TitleContainer)`
  margin-top: 5px;
`

const Description = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.05em;
  text-align: center;
`

const NewsFeed = () => {
  const { carouselSlidesData, loading } = useFetchPromoHome()
  console.log(carouselSlidesData)
  return (
    <>
      {loading ? (
        <></>
      ) : (
        carouselSlidesData?.map((news, i) => (
          <>
            <NewsContainer border={i !== 0}>
              <TitleContainer>
                <Title>{news.header}</Title>
              </TitleContainer>
              <DescriptionContainer>
                <Description>{news.text}</Description>
              </DescriptionContainer>
            </NewsContainer>
            <BreakLine />
          </>
        ))
      )}
    </>
  )
}

export default NewsFeed
