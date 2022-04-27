import React, { useState } from 'react'
import { useSousHarvest } from 'hooks/useHarvest'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateUserPendingReward } from 'state/pools'
import ListViewContent from 'components/ListViewContent'
import { useAppDispatch } from 'state'
import { StyledButton } from '../styles'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  sousId: number
  userEarnings: number
  earnTokenSymbol: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ sousId, earnTokenSymbol, disabled, userEarnings }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useSousHarvest(sousId)
  const { toastSuccess } = useToast()
  const isMobile = useIsMobile()

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess('Harvest Successful', {
          text: 'View Transaction',
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(updateUserPendingReward(chainId, sousId, account))
    setPendingTrx(false)
  }

  return (
    <ActionContainer>
      {isMobile && (
        <ListViewContent
          title={`Earned ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          width={100}
          height={50}
          ml={10}
        />
      )}
      <StyledButton disabled={disabled || pendingTrx} onClick={handleHarvest} load={pendingTrx}>
        HARVEST
      </StyledButton>
      {!isMobile && (
        <ListViewContent
          title={`Earned ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          width={150}
          height={50}
          ml={10}
        />
      )}
    </ActionContainer>
  )
}

export default React.memo(HarvestAction)
