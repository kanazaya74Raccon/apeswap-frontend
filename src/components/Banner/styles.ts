import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Style for the banner flex
  flexPrimary: {
    position: 'relative',
    width: '100%',
  },
  // Style for banner image
  imagePrimary: {
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '10px',
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
