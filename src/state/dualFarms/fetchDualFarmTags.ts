import axios from 'axios'

const fetchDualFarmTagsFromApi = async (chainId: number) => {
  try {
    const dualFarmTagsResult = await axios.get('https://apeswap-strapi.herokuapp.com/tags')
    const tagResult = dualFarmTagsResult.data[0].tags[`${chainId}`].farms

    return tagResult
  } catch (error) {
    console.error('fetchDualFarmTagsFromApiError::', error)
    return null
  }
}

export default fetchDualFarmTagsFromApi
