import { Flex } from '@ape.swap/uikit'
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
    width: '37%',
  },
  // Style for the banner text
  titleText: {
    fontWeight: 700,
    lineHeight: '3.75vw',
    fontSize: '4vw',
    '@media screen and (min-width: 1130px)': {
      lineHeight: '45px',
      fontSize: '45px',
    },
  },
  // Style for learn more text
  learnText: {
    mt: '5%',
    fontSize: '1.65vw',
    textDecoration: 'underline',
    '@media screen and (min-width: 1130px)': {
      fontSize: '18px',
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
