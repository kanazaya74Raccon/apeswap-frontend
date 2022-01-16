import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

const Option1 = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
  }
`

const HeadCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  border-radius: 10px;
  margin-bottom: 0.5em;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  }
`
const HeadBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`
const HeadTitle = styled(Heading)`
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-weight: 700;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 22px;
  }
`
const HeadDesc = styled(Text)`
  font-size: 12px;
  color: #ffb300;
  font-weight: 500;
`

export const OptionCard = ({ type, title, desc, children }) => (
  <Option1 style={{ width: type === '1' ? '100%' : '49%' }}>
    <HeadCard>
      <HeadBody>
        <HeadTitle>{title}</HeadTitle>
        <HeadDesc>{desc}</HeadDesc>
      </HeadBody>
    </HeadCard>
    {children}
  </Option1>
)

export default OptionCard
