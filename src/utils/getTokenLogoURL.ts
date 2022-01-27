import { CHAIN_ID } from 'config/constants/chains'
import { getMaticTokenLogoURL } from 'config/constants/maticTokenMapping'

const getTokenLogoURL = (address: string, chainId: any) => {
  let imageURL
  if (chainId === CHAIN_ID.BSC) {
    imageURL = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${address}/logo.png`
  } else if (chainId === CHAIN_ID.MATIC) {
    imageURL = getMaticTokenLogoURL(address)
  } else {
    imageURL = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  }
  return imageURL
}

export default getTokenLogoURL
