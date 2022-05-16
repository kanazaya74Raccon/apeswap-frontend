import axios from 'axios'

const fetchFarmTagsFromApi = async () => {
  try {
    const farmTagsResult = await axios.get('https://apeswap-strapi.herokuapp.com/tags')
    const tagResult = farmTagsResult.data[0].tags['56'].farms

    return tagResult
  } catch (error) {
    console.error('fetchFarmTagsFromApiError::', error)
    return null
  }
}

export default fetchFarmTagsFromApi
