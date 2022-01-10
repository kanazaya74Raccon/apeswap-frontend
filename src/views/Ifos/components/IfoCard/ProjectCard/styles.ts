import styled from 'styled-components'
import { Card } from '@apeswapfinance/uikit'

export const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  width: 100%;
  margin-bottom: 26px;
`

export const Banner = styled.img`
  width: 100%;
  max-height: 135px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px 50px;
  }
`

export const CardListBox = styled.div`
  display: flex;
  padding: 20px 0px;
  gap: 20px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }

  > div {
    flex: 1;
  }
`