import React, { useState } from 'react'
import { useSousHarvest } from 'hooks/useHarvest'
import { AutoRenewIcon, LinkExternal, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
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
  userEarningsUsd: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ sousId, disabled, userEarningsUsd }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useSousHarvest(sousId)
  const { toastSuccess } = useToast()
  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl

  return (
    <ActionContainer>
      {isMobile && <ListViewContent title="Earned" value={userEarningsUsd} width={100} height={50} ml={10} />}
      <StyledButton
        disabled={disabled || pendingTrx}
        onClick={async () => {
          setPendingTrx(true)
          await onHarvest()
            .then((resp) => {
              const trxHash = resp.transactionHash
              toastSuccess(
                'Harvest Successful',
                <LinkExternal href={getEtherscanLink(trxHash, 'transaction', chainId)}>
                  <Text> View Transaction </Text>
                </LinkExternal>,
              )
            })
            .catch((e) => {
              console.error(e)
              setPendingTrx(false)
            })
          dispatch(updateUserPendingReward(chainId, sousId, account))
          setPendingTrx(false)
        }}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        HARVEST
      </StyledButton>
      {!isMobile && <ListViewContent title="Earned" value={userEarningsUsd} width={100} height={50} ml={10} />}
    </ActionContainer>
  )
}

export default React.memo(HarvestAction)
