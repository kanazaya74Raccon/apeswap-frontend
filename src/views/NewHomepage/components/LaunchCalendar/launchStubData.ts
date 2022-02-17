import { LaunchType } from './types'

export const launchStubData: LaunchType[] = [
  {
    image1: 'images/banana.svg',
    image2: 'x',
    textLine1: 'Reddit AMA',
    textLine2: 'League of Ancients',
    textLine3: 'sometext here',
    launchTime: new Date(),
  },
  {
    image1: 'images/banana.svg',
    image2: 'x',
    textLine1: 'Reddit AMA',
    textLine2: 'League of Ancients',
    launchTime: new Date(1),
  },
  { image1: '', textLine1: 'TEXTASDASDASD', launchTime: new Date(2) },
  { image1: 'images/banana.svg', image2: 'x', textLine1: 'ASDASDASDASDA', launchTime: new Date() },
  { image1: '', textLine1: '#WenBinanceSer', launchTime: new Date() },
  { image1: '', textLine1: 'Reddit AMA', launchTime: new Date() },
  { image1: '', textLine1: 'Reddit AMA', launchTime: new Date() },
  { image1: '', textLine1: 'Reddit AMA', launchTime: new Date() },
]
