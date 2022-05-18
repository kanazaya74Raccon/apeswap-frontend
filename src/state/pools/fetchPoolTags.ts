import axios from 'axios'

const fetchPoolTagsFromApi = async (chainId: number) => {
  try {
    const poolTagsResult = await axios.get('https://apeswap-strapi.herokuapp.com/tags')
    const tagResult = poolTagsResult.data[0].tags[`${chainId}`].pools

    return tagResult
  } catch (error) {
    console.error('fetchPoolTagsFromApiError::', error)
    return null
  }
}

export default fetchPoolTagsFromApi
