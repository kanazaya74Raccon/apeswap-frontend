import { getPancakeRabbitsAddress } from 'utils/addressHelpers'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import { getContract } from 'utils/web3'
import { Profile } from 'state/types'
import nfts from 'config/constants/nfts'
import orderBy from 'lodash/orderBy'


const rabbitContract = getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())

const getProfile = async (address: string): Promise<Profile> => {
  try {
    console.log(address)
    const nfaReturn = await rabbitContract.methods.getPunkIndexesOfOwner(address).call()
    const nfaList = nfaReturn.map((bool, i) => (bool ? i : -1)).filter((i) => i !== -1)
    const ownedNfts = nfaList.map((index) => nfts[index])
    const rarestNft = ownedNfts ? orderBy(ownedNfts, ['attributes.rarityOverallRank'])[0] : null
    // Save the preview image to local storage for the exchange
    localStorage.setItem(
      `profile_${address}`,
      JSON.stringify({
        avatar: rarestNft.image
      }),
    )
    return {
      ownedNfts,
      rarestNft
    } as Profile
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getProfile
