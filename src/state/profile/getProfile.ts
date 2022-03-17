import { Nfa, Profile } from 'state/types'
import nfaABI from 'config/abi/nonFungibleApes.json'
import nfbABI from 'config/abi/nonFungibleBananas.json'
import { getNonFungibleApesAddress, getNonFungibleBananasAddress } from 'utils/addressHelper'
import { getContract } from 'utils/getContract'
import orderBy from 'lodash/orderBy'

const getProfile = async (nfas: Nfa[], chainId: number, address: string): Promise<Profile> => {
  const nfaAddress = getNonFungibleApesAddress(chainId)
  const nfaContract = getContract(nfaABI, nfaAddress, chainId)

  const nfbAddress = getNonFungibleBananasAddress(chainId)
  const nfbContract = getContract(nfbABI, nfbAddress, chainId)
  try {
    const nfasOwned = address ? await nfaContract.balanceOf(address) : '0'
    const nfbsOwned = address ? await nfbContract.balanceOf(address) : '0'
    if (nfasOwned === '0' && nfbsOwned === '0') {
      return null
    }
    let ownedNfts = null
    let rarestNft = null
    if (nfasOwned !== '0' && !nfasOwned.eq(0)) {
      const promises = []
      for (let i = 0; i < nfasOwned; i++) {
        promises.push(nfaContract.tokenOfOwnerByIndex(address, i))
      }
      const nfaReturn = await (await Promise.all(promises)).map(Number)
      ownedNfts = nfaReturn.map((index) => nfas[index])
      rarestNft = ownedNfts ? orderBy(ownedNfts, ['attributes.rarityOverallRank'])[0] : null
      // Save the preview image to local storage for the exchange
      localStorage.setItem(
        `profile_${address}`,
        JSON.stringify({
          avatar: rarestNft.image,
        }),
      )
    } else if (nfbsOwned !== '0' && !nfbsOwned.eq(0)) {
      const promises = []
      for (let i = 0; i < nfbsOwned; i++) {
        promises.push(nfbContract.tokenOfOwnerByIndex(address, i))
      }
      const nfbReturn = await (await Promise.all(promises)).map(Number)
      rarestNft = {
        image: `https://ipfs.io/ipfs/QmYhuJnr3GGUnDGtg6rmSXTgo7FzaWgrriqikfgn5SkXhZ/${nfbReturn[0]}.png`,
      }

      ownedNfts = null
      // Save the preview image to local storage for the exchange
      localStorage.setItem(
        `profile_${address}`,
        JSON.stringify({
          avatar: rarestNft.image,
        }),
      )
    }
    return ownedNfts || rarestNft
      ? ({
          ownedNfts,
          rarestNft,
        } as Profile)
      : null
  } catch (error) {
    return null
  }
}

export default getProfile
