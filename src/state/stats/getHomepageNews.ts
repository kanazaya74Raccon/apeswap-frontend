import { baseUrlStrapi } from 'hooks/api'
import { NewsCardType } from 'state/types'

const getHomepageNews = async (): Promise<NewsCardType[]> => {
  try {
    const response = await fetch(`${baseUrlStrapi}/home-v-2-marketing-cards`)
    const newsRes = await response.json()
    if (newsRes.statusCode === 500) {
      return null
    }
    return newsRes
  } catch (error) {
    return null
  }
}

export default getHomepageNews
