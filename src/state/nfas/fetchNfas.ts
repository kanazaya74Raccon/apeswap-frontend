import { Nfa } from 'state/types'

const fetchNfas = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/ApeSwapFinance/non-fungible-apes/main/info/apesData.json',
    )
    const nfaResp = await response.json()
    if (nfaResp.statusCode === 500) {
      return null
    }
    const nfaImageReplace = nfaResp.map((nfa: Nfa) => {
      return {
        ...nfa,
        image: `https://raw.githubusercontent.com/ApeSwapFinance/non-fungible-apes/main/images/${nfa.index}.png`,
      }
    })
    return nfaImageReplace
  } catch (error) {
    return null
  }
}

export default fetchNfas
