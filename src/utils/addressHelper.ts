import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'

export const getBananaAddress = (chainId: number) => {
  return addresses.banana[chainId]
}
export const getGoldenBananaAddress = (chainId: number) => {
  return addresses.goldenBanana[chainId]
}
export const getTreasuryAddress = (chainId: number) => {
  return addresses.treasury[chainId]
}
export const getSyrupAddress = (chainId: number) => {
  return addresses.syrup[chainId]
}
export const getMasterChefAddress = (chainId: number) => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = (chainId: number) => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = (chainId: number) => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = (chainId: number) => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = (chainId: number) => {
  return addresses.lotteryNFT[chainId]
}
export const getBananaProfileAddress = (chainId: number) => {
  return addresses.bananaProfile[chainId]
}
export const getNonFungibleApesAddress = (chainId: number) => {
  return addresses.nonFungibleApes[chainId]
}
export const getRabbitMintingFarmAddress = (chainId: number) => {
  return addresses.rabbitMintingFarm[chainId]
}
export const getClaimRefundAddress = (chainId: number) => {
  return addresses.claimRefund[chainId]
}
export const getAuctionAddress = (chainId: number) => {
  return addresses.auction[chainId]
}
export const getApePriceGetterAddress = (chainId: number) => {
  return addresses.apePriceGetter[chainId]
}
export const getVaultApeAddress = (chainId: number) => {
  return addresses.vaultApe[chainId]
}
export const getMiniChefAddress = (chainId: number) => {
  return addresses.miniApeV2[chainId]
}
export const getNativeWrappedAddress = (chainId: number) => {
  return addresses.nativeWrapped[chainId]
}
export const getIazoExposerAddress = (chainId: number) => {
  return addresses.iazoExposer[chainId]
}
export const getIazoSettingsAddress = (chainId: number) => {
  return addresses.iazoSettings[chainId]
}
export const getIazoFactoryAddress = (chainId: number) => {
  return addresses.iazoFactoryProxy[chainId]
}
export const getTokenSymbolFromAddress = (chainId: number, address: string) => {
  return Object.keys(tokens).find((token) => {
    return tokens[token].address[chainId] === address
  })
}
