import { ArrowDropDownIcon, Flex } from '@ape.swap/uikit'
import styled from '@emotion/styled'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Style for the banner flex
  flexPrimary: {
    position: 'relative',
    width: '100%',
  },
  // Style for title container
  titleContainer: {
    position: 'absolute',
    flexDirection: 'column',
    top: '20%',
    left: '5%',
    width: '45%',
  },
  // Style for the banner text
  titleText: {
    fontWeight: 700,
    lineHeight: '4.5vw',
    fontSize: '5vw',
    '@media screen and (min-width: 1130px)': {
      lineHeight: '50px',
      fontSize: '55px',
    },
  },
  // Style for learn more text
  learnText: {
    mt: '5%',
    fontSize: 'calc(6px + 1.5vw)',
    '@media screen and (min-width: 1130px)': {
      fontSize: '22.5px',
    },
  },
}

export const FlexImage = styled(Flex)<{ maxWidth?: number }>`
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  width: 100%;
  height: 24vw;
  @media screen and (min-width: ${({ maxWidth }) => maxWidth}px) {
    height: ${({ maxWidth }) => maxWidth / 4}px;
    width: ${({ maxWidth }) => maxWidth}px;
  }
`

export const LearnMoreArrow = styled(ArrowDropDownIcon)`
  transform: rotate(270deg);
  margin-left: 10px;
  width: calc(4px + 0.9vw);
  @media screen and (min-width: 1130px) {
    width: 14px;
  }
`
