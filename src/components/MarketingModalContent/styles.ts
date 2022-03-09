import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const ModalBody = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  /* background: red; */
  width: 100%;
  height: 100%;
  padding: 0px 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 100%;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 10px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
export const StyledImage = styled.img`
  width: 240px;
  height: 120px;
`
export const StyledText = styled(Text)`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`
export const MiniHeaderText = styled(StyledText)`
  font-size: 22px;
  line-height: 33px;
`
export const MiniText = styled(StyledText)`
  font-size: 12px;
  line-height: 14px;
`
export const MiniButton = styled.button`
  color: ${({ theme }) => theme.colors.yellow};
  text-decoration: underline;
  font-size: 12px;
  border: none;
  background: transparent;
  padding: 0;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`
