import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { useFetchNewsHome } from 'state/strapi/fetchStrapi'

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
  padding-top: 5px;
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

const ImageContainer = styled.div<{ image: string }>`
  height: 119px;
  width: 293px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
`

const NewsFeed = () => {
  const { newsData, loading } = useFetchNewsHome()
  return (
    <>
      {loading ? (
        <></>
      ) : (
        newsData?.map((news, i) => (
          <a href={news.link} target="_blank" rel="noopener noreferrer" key={news.title}>
            <NewsContainer border={i !== 0} key={news.link}>
              <ImageContainer image={news.image[0]?.url} />
              <TitleContainer>
                <Title>{news.title}</Title>
              </TitleContainer>
              <DescriptionContainer>
                <Description>{news.description}</Description>
              </DescriptionContainer>
            </NewsContainer>
            <BreakLine />
          </a>
        ))
      )}
    </>
  )
}

export default NewsFeed
