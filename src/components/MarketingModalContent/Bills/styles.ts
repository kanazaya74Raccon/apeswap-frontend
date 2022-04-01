import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const MainBody = styled.div`
  height: 100%;
  /* background: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0em 1.5em;
`
export const StyledText = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  text-align: center;
  margin: 0.5em 0;
`
export const TextButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.yellow};
  text-decoration: underline;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  margin: 0.5em 0;

  &:hover {
    cursor: pointer;
  }
`
export const Hiw = styled(StyledText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  margin-top: 1em;
`
export const MainContentBody = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  /* background: yellow; */
  margin-top: 1em;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1em 2.5em;
  /* background: green; */
  width: 80%;
`
export const RightText = styled(StyledText)`
  margin: 0 0 0 1em;
  text-align: left;
  width: 70%;
`

export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const RightContent = styled.div``
