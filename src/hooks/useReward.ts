import { useCallback } from 'react'

const useReward = (rewardRef, callback) => {
  const handleReward = useCallback(
    async (...args) => {
      await callback(...args)
      // TODO error visual effect
      // .catch(() => rewardRef.current?.punishMe())
      rewardRef.current?.rewardMe()
    },
    [callback, rewardRef],
  )

  return handleReward
}

export default useReward
