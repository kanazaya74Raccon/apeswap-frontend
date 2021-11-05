import { Profile } from 'state/types'
import nfts from 'config/constants/nfts'
import nfaABI from 'config/abi/nonFungibleApes.json'
import { getNonFungibleApesAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import orderBy from 'lodash/orderBy'

const getProfile = async (chainId: number, address: string): Promise<Profile> => {
  const nfaAddress = getNonFungibleApesAddress(chainId)
  const nfaContract = getContract(nfaABI, nfaAddress, chainId)
  try {
    const nfasOwned = address ? await nfaContract.methods.balanceOf(address).call() : '0'
    if (nfasOwned === '0') {
      return null
    }
    const promises = []
    for (let i = 0; i < nfasOwned; i++) {
      promises.push(nfaContract.methods.tokenOfOwnerByIndex(address, i).call())
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
    return null
  }
}

export default getProfile
