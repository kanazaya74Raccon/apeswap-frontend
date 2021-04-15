import { getBananaProfileAddress, getNonFungibleApesAddress, getRabbitMintingFarmAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import profileABI from 'config/abi/bananaProfile.json'
import nonFungibleApesAbi from 'config/abi/nonFungibleApes.json'
import rabbitMintingFarmAbi from 'config/abi/rabbitmintingfarm.json'

export const getProfileContract = () => {
  return getContract(profileABI, getBananaProfileAddress())
}

export const getNonFungibleApesContract = () => {
  return getContract(nonFungibleApesAbi, getNonFungibleApesAddress())
}

export const getRabbitMintingContract = () => {
  return getContract(rabbitMintingFarmAbi, getRabbitMintingFarmAddress())
}

export default null
