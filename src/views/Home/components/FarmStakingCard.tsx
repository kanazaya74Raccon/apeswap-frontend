import React, { useState, useCallback, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { Heading, Button, Card, CardBody, Text, BananaIcon, BananaPairIcon} from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from './UnlockButton'
import BananaHarvestBalance from './BananaHarvestBalance'
import BananaHarvestUsdBalance from './BananaHarvestUsdBalance'
import BananaWalletUsdBalance from './BananaWalletUsdBalance'
import BananaWalletBalance from './BananaWalletBalance'
import CardHeader from './CardHeader'

const StyledFarmStakingCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  text-align: center;
  overflow: visible;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  // color: ${({ theme }) => theme.colors.textSubtle};
  color: #FFB300;
  font-size: 12px;
  margin-left: 2px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const StyledButton = styled(Button)`
    width: 220px;
    height: 50px;
    background: #FFB300;
    border-radius: 10px;
    border: 0px;
`

const StyledBanana = styled(BananaIcon)`
  width: 90px;
  position: absolute;
  left: -10px;
  top: -25px;
  z-index: 100;
  transform: rotate(100deg);
`

const StyledBanana2 = styled(BananaIcon)`
  width: 70px;
  position: absolute;
  bottom: -20px;
  left: 30px;
  z-index: 100;
  transform: rotate(10deg);
`

const StyledBananaPair = styled(BananaPairIcon)`
  width: 90px;
  position: absolute;
  right: -10px;
  top: 15px;
  z-index: 100;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)

  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

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
      <CardHeader>
          <StyledBanana />
          <StyledBanana2 />
          <StyledBananaPair />
          <Heading size="xl"  mb="0px" color="white">{TranslateString(542, 'Farms &')}<br/>{TranslateString(542, 'Staking')}</Heading>
      </CardHeader>
      <CardBody>
        <Block>
          <BananaHarvestBalance />
          <FlexRow>
          <BananaHarvestUsdBalance />
          <Label>{TranslateString(544, 'in BANANA to Harvest')}</Label>
          </FlexRow>
        </Block>
        <Block>
          <BananaWalletBalance />
          <FlexRow>
            <BananaWalletUsdBalance />
            <Label>{TranslateString(546, 'in BANANA in Wallet')}</Label>
          </FlexRow>
        </Block>
        <Actions>
          {account ? (
            <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
              <StyledButton
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                fullWidth
              >
                {pendingTx
                  ? TranslateString(548, 'Collecting BANANA')
                  : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
              </StyledButton>
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
