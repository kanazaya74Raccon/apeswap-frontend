import { useBananaAddress } from './useAddress'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's BANANA balance is at least the amount passed in
 */
const useHasBananaBalance = (minimumBalance) => {
  const bananaBalance = useTokenBalance(useBananaAddress())
  return bananaBalance.gte(minimumBalance)
}

export default useHasBananaBalance
