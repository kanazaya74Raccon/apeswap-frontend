import { baseUrlStrapi } from 'hooks/api'
import { LaunchCalendarCard } from 'state/types'

const getHomepageLaunchCalendar = async (): Promise<LaunchCalendarCard[]> => {
  try {
    const response = await fetch(`${baseUrlStrapi}/home-v-2-launch-calendars`)
    const launchRes = await response.json()
    if (launchRes.statusCode === 500) {
      return null
    }
    return launchRes
  } catch (error) {
    return null
  }
}

export default getHomepageLaunchCalendar
