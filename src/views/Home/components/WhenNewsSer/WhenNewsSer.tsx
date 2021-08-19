import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Card, Text } from '@apeswapfinance/uikit'
import NewsFeed from './NewsFeed'

const WhenNewsSerWrapper = styled(Card)`
  width: 336px;
  height: 689px;
  border-radius: 30px;
`

const NewsWrapper = styled.div`
  display: flex;
  height: 600px;
  margin-top: 5px;
  width: 336px;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: scroll;
`

const WhenNewsSerText = styled(Text)`
  margin-top: 20px;
  font-size: 27px;
  margin-bottom: 25px;
  text-align: center;
`

const WhenNewsSer = () => {
  const TranslateString = useI18n()

  return (
    <>
      <WhenNewsSerWrapper>
        <WhenNewsSerText>When News Ser?</WhenNewsSerText>
        <NewsWrapper>
          <NewsFeed />
        </NewsWrapper>
      </WhenNewsSerWrapper>
    </>
  )
}

export default WhenNewsSer
