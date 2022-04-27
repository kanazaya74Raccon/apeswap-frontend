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
    top: '20%',
    left: '5%',
    width: '37%',
  },
  // Style for the banner text
  titleText: {
    fontWeight: 700,
    lineHeight: '5vw',
    fontSize: '4vw',
    '@media screen and (min-width: 1130px)': {
      lineHeight: '60px',
      fontSize: '45px',
    },
  },
}
