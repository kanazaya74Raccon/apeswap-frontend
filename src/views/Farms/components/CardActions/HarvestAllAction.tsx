import React, { useState } from 'react'
import { useAllHarvest } from 'hooks/useHarvest'
import { AutoRenewIcon, Button } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateFarmUserEarnings } from 'state/farms'
import { useAppDispatch } from 'state'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  pids: number[]
  disabled: boolean
}

const HarvestAllAction: React.FC<HarvestActionsProps> = ({ pids, disabled }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onReward } = useAllHarvest(pids, chainId)

  return (
    <ActionContainer>
      <Button
        size="mds"
        className="noClick"
        disabled={disabled || pendingTrx}
        onClick={async () => {
          setPendingTrx(true)
          await onReward().catch((e) => {
            console.error(e)
            setPendingTrx(false)
          })
          pids.map((pid) => {
            return dispatch(updateFarmUserEarnings(chainId, pid, account))
          })
          setPendingTrx(false)
        }}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        HARVEST ALL ({pids.length})
      </Button>
    </ActionContainer>
  )
}

export default React.memo(HarvestAllAction)
