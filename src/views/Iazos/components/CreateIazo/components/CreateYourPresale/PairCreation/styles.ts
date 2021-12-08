import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const PairCreationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 285px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : '#E5E5E5')};
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 725px;
    flex-wrap: nowrap;
  }
`

export const PresaleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 286px;
  border-radius: 10px;
  background: rgba(255, 179, 0, 0.1);
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  margin-bottom: 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
  }
`

export const StyledText = styled(Text)<{ wallet: string }>`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 30px;
  &:after {
    color: rgba(255, 179, 0, 1);
    font-size: 15px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 20px;
    }
    content: '${(props) => props.wallet}';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`

export const PairContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  width: 300px;
  margin-bottom: 50px;
`

export const StyledDescription = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-top: 10px;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
