import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Style for the banner flex
  flexPrimary: {
    position: 'relative',
    width: '100%',
    height: '25vw',
    maxHeight: '300px',
    maxWidth: '1200px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '10px',
    alignItems: 'center',
    '@media screen and (min-width: 1130px)': {
      height: '282.5px',
      width: '1130px',
    },
  },
  // Style for title container
  titleContainer: {
    position: 'relative',
    width: '50%',
    ml: '5vw',
    mb: '5vw',
    '@media screen and (min-width: 1200px)': {
      ml: '60px',
      mb: '60px',
    },
  },
  // Style for the banner text
  titleText: {
    fontWeight: 700,
    lineHeight: '5vw',
    fontSize: '4.5vw',
    '@media screen and (min-width: 1200px)': {
      lineHeight: '60px',
      fontSize: '55px',
    },
  },
}
