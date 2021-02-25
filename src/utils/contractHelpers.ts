import { getBananaProfileAddress, getPancakeRabbitsAddress, getRabbitMintingFarmAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import profileABI from 'config/abi/bananaProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import rabbitMintingFarmAbi from 'config/abi/rabbitmintingfarm.json'

export const getProfileContract = () => {
  return getContract(profileABI, getBananaProfileAddress())
}

export const getPancakeRabbitContract = () => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())
}

export const getRabbitMintingContract = () => {
  return getContract(rabbitMintingFarmAbi, getRabbitMintingFarmAddress())
}

export default null
