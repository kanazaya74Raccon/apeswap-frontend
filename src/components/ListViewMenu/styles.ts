import styled from 'styled-components'
import { Card, Text, Checkbox, Heading, Flex } from '@apeswapfinance/uikit'

export const ControlContainer = styled(Card)`
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: column;
  overflow: visible;
  transform: translateY(-85px);
  width: 100vw;
  padding: 15px;
  z-index: ${({ theme }) => theme.zIndices.dropdown};

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    min-height: 59px;
    padding: 0px 130px 0px 30px;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-60px);
    margin: 0px 10px;
    width: auto;
  }
`

export const ControlWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  border: 1px solid red;
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${Text} {
    margin-left: 4px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 8px;
    }
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > ${Text} {
    font-size: 12px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
  }
`

export const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    align-items: center;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

export const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

export const Header = styled.div`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/farm-night.svg)' : 'url(/images/farm-day.svg)')};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    height: 300px;
  }
`

export const StyledText = styled(Text)`
  font-weight: 700;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 16px !important;
  }
`
export const StyledCheckbox = styled(Checkbox)<{ checked?: boolean }>`
  height: 21px;
  width: 21px;
  margin-left: 20px;
`

export const StyledImage = styled.img`
  height: 187px;
  width: 134px;
  position: absolute;
  right: 0px;
  bottom: 51px;
  display: none;

  @media screen and (min-width: 340px) {
    right: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    bottom: 51px;
    right: 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 0px;
    right: 0px;
    display: block;
  }
`

export const StyledHeading = styled(Heading)`
  font-size: 30px;
  max-width: 176px !important;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 30px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

export const SectionOneWrapper = styled(Flex)`
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 440px;
  }
`

export const SectionTwoWrapper = styled(Flex)`
  justify-content: space-between;
  width: 50%;
  align-items: center;
  margin-top: 15px;
  align-self: flex-start;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 265px;
    margin-top: 0px;
    align-self: center;
  }
`

export const HarvestAllWrapper = styled(Flex)`
  width: 100%;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 210px;
    margin-top: 0px;
  }
`
