import React, { useMemo, useState, useCallback, useRef } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, Flex, Text } from '@apeswapfinance/uikit'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import rewards from 'config/constants/rewards'
import Reward from 'react-rewards'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const StyledText = styled(Text)`
  padding-top: 16px;
  font-weight: bold;
  font-size: 12px;
`

const StyledFlex = styled(Flex)`
  margin-left: 136px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  liquidity?: BigNumber
  addLiquidityUrl?: string
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account, addLiquidityUrl }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const sucess = await onApprove()
      if (!sucess) setTypeOfReward('error')
      else setTypeOfReward('rewardBanana')
      setRequestedApproval(false)
      rewardRef.current?.rewardMe()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
        <Button mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
          {TranslateString(999, 'Approve Contract')}
        </Button>
      </Reward>
    )
  }

  return (
    <StyledFlex>
      <StyledText fontFamily="poppins">{TranslateString(999, 'Staked')}</StyledText>
      {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
    </StyledFlex>
  )
}

export default CardActions
