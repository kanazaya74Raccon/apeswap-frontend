import React, { useState } from 'react'
import { useHarvest } from 'hooks/useHarvest'
import { AutoRenewIcon, LinkExternal, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateFarmUserEarnings } from 'state/farms'
import ListViewContent from 'components/ListViewContent'
import { useAppDispatch } from 'state'
import { FarmButton } from '../styles'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  pid: number
  userEarningsUsd: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pid, disabled, userEarningsUsd }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useHarvest(pid)
  const { toastSuccess } = useToast()
  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl

  return (
    <ActionContainer>
      {isMobile && <ListViewContent title="Earned" value={userEarningsUsd} width={100} height={50} ml={10} />}
      <FarmButton
        className="noClick"
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
          dispatch(updateFarmUserEarnings(chainId, pid, account))
          setPendingTrx(false)
        }}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        HARVEST
      </FarmButton>
      {!isMobile && <ListViewContent title="Earned" value={userEarningsUsd} width={100} height={50} ml={10} />}
    </ActionContainer>
  )
}

export default React.memo(HarvestAction)
