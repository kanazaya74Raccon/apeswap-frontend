import React, { useState } from 'react'
import { useAllHarvest } from 'hooks/useHarvest'
import { AutoRenewIcon, Button } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  pids: number[]
  disabled: boolean
}

const HarvestAllAction: React.FC<HarvestActionsProps> = ({ pids, disabled }) => {
  const { chainId } = useActiveWeb3React()
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
