import axios from 'axios'

const fetchPoolTagsFromApi = async () => {
  try {
    const poolTagsResult = await axios.get('https://apeswap-strapi.herokuapp.com/tags')
    const tagResult = poolTagsResult.data[0].tags['56'].pools

    return tagResult
  } catch (error) {
    console.error('fetchFarmTagsFromApiError::', error)
    return null
  }
}

export default fetchPoolTagsFromApi
