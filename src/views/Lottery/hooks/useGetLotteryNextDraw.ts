import { useEffect, useState } from 'react'
import useRefresh from 'hooks/useRefresh'
import { getLotteryDrawTime, getLotteryDrawStep } from '../helpers/CountdownHelpers'
/**
 * Returns whether or not the current lottery has drawn numbers
 *
 * @return {Boolean}
 */
const useGetLotteryNextDraw = () => {
  const [status, setLotteryHasDrawn] = useState({} as any)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchLotteryStatus = async () => {
      const currentMillis = new Date().getTime()
      const step = await getLotteryDrawStep(currentMillis)
      const time = await getLotteryDrawTime(currentMillis)
      setLotteryHasDrawn({ step, time })
    }
    fetchLotteryStatus()
  }, [slowRefresh])

  return status
}

export default useGetLotteryNextDraw
