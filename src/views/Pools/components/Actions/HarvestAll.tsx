import React, { useState } from 'react'
import { useSousHarvestAll } from 'hooks/useHarvest'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { fetchPoolsUserDataAsync } from 'state/pools'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { StyledButton } from '../styles'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  sousIds: number[]
  disabled?: boolean
}

const HarvestAll: React.FC<HarvestActionsProps> = ({ sousIds, disabled }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvestAll } = useSousHarvestAll(sousIds)
  const { toastSuccess } = useToast()
  const isMobile = useIsMobile()

  const handleHarvestAll = async () => {
    setPendingTrx(true)
    await onHarvestAll()
      .then((resp) => {
        resp.map((trx) =>
          toastSuccess('Harvest Successful', {
            text: 'View Transaction',
            url: getEtherscanLink(trx.transactionHash, 'transaction', chainId),
          }),
        )
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchPoolsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }

  return (
    <ActionContainer>
      <StyledButton disabled={disabled || pendingTrx} onClick={handleHarvestAll} load={pendingTrx}>
        HARVEST ALL
      </StyledButton>
    </ActionContainer>
  )
}

export default React.memo(HarvestAll)
