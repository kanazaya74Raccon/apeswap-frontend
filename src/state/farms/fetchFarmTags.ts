import axios from 'axios'

// type LiveIfo = {
//   id: number
//   label: string
//   settings: {
//     id: number
//     tag: string
//     navItem: string
//   }[]
// }

// const farmTagsData = [
//   {
//     id: 1,
//     tags: {
//       '56': {
//         farms: [
//           { pid: 1, text: 'HOT', color: 'error' },
//           { pid: 184, text: 'NEW', color: 'success' },
//         ],
//         pools: [{ id: 167, text: 'HOT', color: 'error' }],
//       },
//     },
//     publishedAat: '2022-05-10T15:55:42.445Z',
//     createdAt: '2022-05-10T15:55:38.324Z',
//     updatedAt: '2022-05-10T15:55:42.469Z',
//   },
// ][0].tags['56'].farms

// {
//   '56': {

//   }
// }

// const fetchFarmTagsFromApi = async (): Promise<LiveIfo[]> => {
const fetchFarmTagsFromApi = async () => {
  try {
    const farmTagsResult = await axios.get('https://apeswap-strapi.herokuapp.com/tags')
    console.log('farmTagsResult:::', farmTagsResult)
    const tagResult = farmTagsResult.data[0].tags['56'].farms
    console.log('tagResult:::', tagResult)

    return tagResult
  } catch (error) {
    console.error('fetchFarmTagsFromApiError::', error)
    return null
  }
}

export default fetchFarmTagsFromApi
