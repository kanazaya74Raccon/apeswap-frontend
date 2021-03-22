import React, { useState, useCallback, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Skeleton, Text } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

import { useStats } from 'state/hooks'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import BananaHarvestBalance from './BananaHarvestBalance'
import BananaWalletBalance from './BananaWalletBalance'
import CardValue from './CardValue'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/cake-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)

  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const yourStats = useStats()
  const amountToHarvest = yourStats?.stats?.pendingRewardUsd

  const onReward = useReward(
    rewardRef,
    useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid)).onReward,
  )

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      setTypeOfReward('rewardBanana')
      await onReward()
    } catch (error) {
      setTypeOfReward('error')
      rewardRef.current?.rewardMe()
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <CardImage src="/images/cake.svg" alt="cake logo" width={64} height={64} />
        <Block>
          <BananaHarvestBalance />
          <Label>{TranslateString(544, 'BANANA to Harvest')}</Label>
          {amountToHarvest ? (
            <>
              <CardValue fontSize="24px" decimals={0} value={amountToHarvest} prefix="$" />
              <Text fontSize="12px" color="textSubtle">
                {TranslateString(999, 'Harvest $ Value')}
              </Text>
            </>
          ) : (
            <>
              <Skeleton height={66} />
            </>
          )}
        </Block>
        <Block>
          <BananaWalletBalance />
          <Label>{TranslateString(546, 'BANANA in Wallet')}</Label>
        </Block>
        <Actions>
          {account ? (
            <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
              <Button
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                fullWidth
              >
                {pendingTx
                  ? TranslateString(548, 'Collecting BANANA')
                  : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
              </Button>
            </Reward>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
