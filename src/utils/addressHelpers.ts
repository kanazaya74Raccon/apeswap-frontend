import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getBananaAddress = () => {
  return addresses.banana[chainId]
}
export const getGoldenBananaAddress = () => {
  return addresses.goldenBanana[chainId]
}
export const getTreasuryAddress = () => {
  return addresses.treasury[chainId]
}
export const getSyrupAddress = () => {
  return addresses.syrup[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getBananaProfileAddress = () => {
  return addresses.bananaProfile[chainId]
}
export const getNonFungibleApesAddress = () => {
  return addresses.nonFungibleApes[chainId]
}
export const getRabbitMintingFarmAddress = () => {
  return addresses.rabbitMintingFarm[chainId]
}
export const getClaimRefundAddress = () => {
  return addresses.claimRefund[chainId]
}
export const getAuctionAddress = () => {
  return addresses.auction[chainId]
}
export const getVaultApeAddress = () => {
  return addresses.vaultApe[chainId]
}
