import React, { useState, useEffect } from 'react'
import { useModal, Text } from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  totalAmount: BigNumber
  tokenDecimals: number
  notLp?: boolean
}

const IfoCardBNBContribute: React.FC<Props> = ({
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  totalAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userAllocation, setAllocation] = useState(0)
  const [userInfo, setUserInfo] = useState({ amount: 0, claimed: false })

  const { account } = useWallet()
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} notLp />,
  )

  useEffect(() => {
    const fetch = async () => {
      const balance = new BigNumber(await contract.methods.getOfferingAmount(account).call())
      const userinfo = await contract.methods.userInfo(account).call()
      const allocation = await contract.methods.getUserAllocation(account).call()

      setUserInfo(userinfo)
      setAllocation(allocation / 10000)
      setOfferingTokenBalance(balance)
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.harvest().send({ from: account })
    setPendingTx(false)
  }

  const isFinished = status === 'finished'
  const overSubscribed = totalAmount.gte(raisingAmount)
  const percentOfUserContribution = overSubscribed
    ? userAllocation
    : new BigNumber(userInfo.amount).div(raisingAmount).times(100)

  return (
    <>
      <Text fontSize="14px" color="yellow">
        HiFi IAO Investors! We had a slight miscalculation on our end for the BNB fund raise. As some of you may have
        noticed we are off by two decimals on our total percentage raised.
        <br />
        <br />
        🔒 FIRST OF ALL - ALL FUNDS ARE SAFU! 🔒
        <br />
        <br />
        Second - due to this issue, we will have to airdrop your tokens after the raise. We will airdrop everyone&quot;s
        HIFI first and then we will airdrop everyone&quot;s overflow BNB & GNANA second.
        <br />
        <br />
        We are working on writing a script as we speak and you will get your tokens shortly after the IAO ends. We
        appreciate your patience as we complete another incredibly successful Initial Ape Offering!
        <br />
        <br />
      </Text>
      <LabelButton
        disabled={pendingTx || userInfo.claimed}
        buttonLabel={isFinished ? 'Claim' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? userInfo.claimed
              ? 'Claimed'
              : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
            : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
        }
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Text fontSize="14px" color="textSubtle">
        {isFinished
          ? `You'll be refunded any excess tokens when you claim`
          : `${percentOfUserContribution.toFixed(5)}% of total allocation`}
      </Text>
    </>
  )
}

export default IfoCardBNBContribute
