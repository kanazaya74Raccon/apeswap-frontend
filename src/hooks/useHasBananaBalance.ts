import { getBananaAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's CAKE balance is at least the amount passed in
 */
const useHasBananaBalance = (minimumBalance) => {
  const bananaBalance = useTokenBalance(getBananaAddress())
  return bananaBalance.gte(minimumBalance)
}

export default useHasBananaBalance
