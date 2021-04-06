import { getNonFungibleApesAddress } from 'utils/addressHelpers'
import nonFungibleApesAbi from 'config/abi/nonFungibleApes.json'
import { getContract } from 'utils/web3'
import { Profile } from 'state/types'
import nfts from 'config/constants/nfts'
import orderBy from 'lodash/orderBy'

const nonFungibleApesContract = getContract(nonFungibleApesAbi, getNonFungibleApesAddress())

const getProfile = async (address: string): Promise<Profile> => {
  try {
    const nfasOwned = await nonFungibleApesContract.methods.balanceOf(address).call()
    const promises = []
    for (let i = 0; i < nfasOwned; i++) {
      promises.push(nonFungibleApesContract.methods.tokenOfOwnerByIndex(address, i).call())
    }
    const nfaReturn = await (await Promise.all(promises)).map(Number)
    const ownedNfts = nfaReturn.map((index) => nfts[index])
    const rarestNft = ownedNfts ? orderBy(ownedNfts, ['attributes.rarityOverallRank'])[0] : null
    // Save the preview image to local storage for the exchange
    localStorage.setItem(
      `profile_${address}`,
      JSON.stringify({
        avatar: rarestNft.image,
      }),
    )
    return {
      ownedNfts,
      rarestNft,
    } as Profile
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getProfile
