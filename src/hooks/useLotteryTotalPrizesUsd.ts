import { usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalBanana = getBalanceNumber(totalRewards)
  const bananaPriceBusd = usePriceBananaBusd()

  return totalBanana * bananaPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
