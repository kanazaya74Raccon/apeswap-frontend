import { apiBaseUrl } from 'hooks/api'
import getTimePeriods from 'utils/getTimePeriods'

const getNextLotteryDrawTime = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/lottery/next`)
    const data = await response.json()

    return data.millisTimeOfNextDraw
  } catch (error) {
    throw new Error(error as any)
  }
}

// @ts-ignore
const getNextTicketSaleTime = (currentMillis) => (parseInt(currentMillis / 3600000) + 1) * 3600000
const hoursAndMinutesString = (hours, minutes) => `${parseInt(hours)}h, ${parseInt(minutes)}m`

export const getTicketSaleTime = (currentMillis): string => {
  const nextTicketSaleTime = getNextTicketSaleTime(currentMillis)
  const msUntilNextTicketSale = nextTicketSaleTime - currentMillis
  const { minutes } = getTimePeriods(msUntilNextTicketSale / 1000)
  const { hours } = getTimePeriods(msUntilNextTicketSale / 1000)
  return hoursAndMinutesString(hours, minutes)
}

export const getLotteryDrawTime = async (currentMillis): Promise<string> => {
  const nextLotteryDrawTime = await getNextLotteryDrawTime()
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis
  const { minutes } = getTimePeriods(msUntilLotteryDraw / 1000)
  const { hours } = getTimePeriods(msUntilLotteryDraw / 1000)
  return hoursAndMinutesString(hours, minutes)
}

export const getTicketSaleStep = () => (1 / 12) * 100

export const getLotteryDrawStep = async (currentMillis) => {
  const msBetweenLotteries = 43200000
  const endTime = await getNextLotteryDrawTime()
  const msUntilLotteryDraw = endTime - currentMillis
  const percentageRemaining = (msUntilLotteryDraw / msBetweenLotteries) * 100
  return 100 - percentageRemaining
}
