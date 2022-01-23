import styled from 'styled-components'
import { Heading, Text } from '@apeswapfinance/uikit'

export const FeatureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

export const Motto = styled(Text).attrs({
  textAlign: 'center',
})`
  color: ${({ theme }) => theme.colors.yellow};
  margin: 2px 0 6px 0;
`

export const SectionHeading = styled(Heading)`
  font-weight: 600;
`

export const Frame = styled.div`
  margin-top: 48px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.card};
  margin-bottom: 57px;
  padding: 30px 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 50px;
  }
`

export const IconBox = styled.div`
  border-radius: 5px;
  width: 144px;
  height: 98px;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#E5E5E5')};
  position: relative;
  flex-shrink: 0;
  margin-bottom: 8px;
`

export const CenteredImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > a,
  button {
    width: 260px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    gap: 40px;
  }
`
