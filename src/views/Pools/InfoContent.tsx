import React from 'react'
import { Flex, Text, LinkExternal } from '@apeswapfinance/uikit'
import { Pool } from 'state/types'
import { useBlock } from 'state/block/hooks'
import getTimePeriods from 'utils/getTimePeriods'
import { BSC_BLOCK_TIME } from 'config'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const InfoContent: React.FC<{ pool: Pool }> = ({ pool }) => {
  const { chainId } = useActiveWeb3React()
  const { currentBlock } = useBlock()
  const timeUntilStart = getTimePeriods(Math.max(pool?.startBlock - currentBlock, 0) * BSC_BLOCK_TIME, true)
  const timeUntilEnd = getTimePeriods(Math.max(pool?.endBlock - currentBlock, 0) * BSC_BLOCK_TIME, true)
  const explorerLink = BLOCK_EXPLORER[chainId]
  const contractLink = `${explorerLink}/address/${pool?.contractAddress[chainId]}`
  const tokenContractLink = `${explorerLink}/address/${pool?.rewardToken?.address[chainId]}`
  return (
    <>
      <Flex flexDirection="column">
        {pool?.endBlock > 0 && (
          <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
            <Text style={{ fontSize: '14px' }}>{pool?.startBlock > currentBlock ? 'Starts in' : 'Ends in'}</Text>
            <Text style={{ fontSize: '16px' }} bold>
              {pool?.startBlock > currentBlock
                ? `${timeUntilStart.days}d, ${timeUntilStart.hours}h`
                : `${timeUntilEnd.days}d, ${timeUntilEnd.hours}h`}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" justifyContent="center" mt="10px">
          <LinkExternal href={pool?.projectLink} style={{ fontSize: '14px' }}>
            Website
          </LinkExternal>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mt="10px">
          <LinkExternal href={pool?.twitter} style={{ fontSize: '14px' }}>
            Twitter
          </LinkExternal>
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt="20px">
        <LinkExternal href={tokenContractLink} style={{ fontSize: '14px' }}>
          View Token Contract
        </LinkExternal>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt="15px">
        <LinkExternal href={contractLink} style={{ fontSize: '14px' }}>
          View Pool Contract
        </LinkExternal>
      </Flex>
    </>
  )
}

export default React.memo(InfoContent)
