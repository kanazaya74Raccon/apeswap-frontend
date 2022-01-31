import { Profile } from 'state/types'
import nfts from 'config/constants/nfts'
import nfaABI from 'config/abi/nonFungibleApes.json'
import nfbABI from 'config/abi/nonFungibleBananas.json'
import {getNonFungibleApesAddress, getNonFungibleBananasAddress} from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import orderBy from 'lodash/orderBy'

const getProfile = async (chainId: number, address: string): Promise<Profile> => {
  const nfaAddress = getNonFungibleApesAddress(chainId)
  const nfaContract = getContract(nfaABI, nfaAddress, chainId)

  const nfbAddress = getNonFungibleBananasAddress(chainId)
  const nfbContract = getContract(nfbABI, nfbAddress, chainId)
  try {
    const nfasOwned = address ? await nfaContract.methods.balanceOf(address).call() : '0'
    const nfbsOwned = address ? await nfbContract.methods.balanceOf(address).call() : '0'
    if (nfasOwned === '0' && nfbsOwned === '0') {
      return null
    }
    let ownedNfts = null
    let rarestNft = null
    if (nfasOwned !== '0') {
      const promises = []
      for (let i = 0; i < nfasOwned; i++) {
        promises.push(nfaContract.methods.tokenOfOwnerByIndex(address, i).call())
      }
      const nfaReturn = await (await Promise.all(promises)).map(Number)
      ownedNfts = nfaReturn.map((index) => nfts[index])
      rarestNft = ownedNfts ? orderBy(ownedNfts, ['attributes.rarityOverallRank'])[0] : null
      // Save the preview image to local storage for the exchange
      localStorage.setItem(
          `profile_${address}`,
          JSON.stringify({
            avatar: rarestNft.image,
          }),
      )
    } else if (nfbsOwned !== '0') {
      const promises = []
      for (let i = 0; i < nfbsOwned; i++) {
        promises.push(nfbContract.methods.tokenOfOwnerByIndex(address, i).call())
      }
      const nfbReturn = await (await Promise.all(promises)).map(Number)
      rarestNft = {
        "contractAddress": "0x9f707a412302a3ad64028a9f73f354725c992081",
        "tokenId": nfbReturn,
        "attributes": [{"traitType": "Background", "value": "Ocean"}, {
          "traitType": "Stem",
          "value": "Gold"
        }, {"traitType": "OuterPeel", "value": "Banana"}, {
          "traitType": "InnerPeel",
          "value": "Stone"
        }, {"traitType": "Banana", "value": "Quartz"}, {
          "traitType": "InnerPeelModifier",
          "value": "None"
        }, {"traitType": "OuterPeelModifier", "value": "None"}, {
          "traitType": "Aura",
          "value": "Yellow Aura"
        }, {"traitType": "Accessory", "value": "Halo"}, {"traitType": "Lazer", "value": "None"}],
        "externalUrl": "https://apeswap.finance/",
        "image": `https://ipfs.io/ipfs/QmYhuJnr3GGUnDGtg6rmSXTgo7FzaWgrriqikfgn5SkXhZ/${nfbReturn}.png`,
        "name": `Non Fungible Banana #${nfbReturn}`,
        "nftCollection": "61a9a2ea73ab026009ab01dc"
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
    return {
      ownedNfts,
      rarestNft,
    } as Profile
  } catch (error) {
    return null
  }
}

export default getProfile
