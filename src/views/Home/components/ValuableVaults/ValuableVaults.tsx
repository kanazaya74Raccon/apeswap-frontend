import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { Vault } from 'state/types'
import { usePollVaultsData, useVaultFromPid } from 'state/hooks'
import VaultCardForHome from './VaultsCardForHome'

const ValuableVaultsWrapper = styled.div`
  position: relative;
  height: 321px;
  width: 336px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/burning-vaults-polygon-dark.svg)' : 'url(/images/burning-vaults-polygon-dark.svg)'};
  border-radius: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 40px;
  @media screen and (max-width: 350px) {
    width: 300px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 718px;
    height: 203px;
  }
`

const CardHeaderImage = styled.div`
  position: absolute;
  background: ${({ theme }) => (theme.isDark ? 'rgba(184, 152, 237, .6)' : 'rgba(184, 152, 237, .7)')};
  height: 321px;
  width: 100%;
  border-radius: 30px;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 203px;
  }
`

const HotFarmsText = styled(Text)`
  position: relative;
  margin-top: 10px;
  font-size: 38px;
  text-align: center;
  color: #ffffff;
  z-index: 1;
`

const FarmWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 350px) {
    width: 310px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
    flex-direction: row;
    margin-top: 20px;
  }
`

const DEFAULT_FARM = 3
const DEFAULT_FARM_TWO = 2

const VauluableVaults = () => {
  usePollVaultsData()
  const pid1 = DEFAULT_FARM
  const pid2 = DEFAULT_FARM_TWO

  const vaultsToDisplay = [useVaultFromPid(pid1), useVaultFromPid(pid2)]

  return (
    <>
      <ValuableVaultsWrapper>
        <CardHeaderImage />
        <HotFarmsText fontFamily="Titan One">Valuable Vaults</HotFarmsText>
        <FarmWrapper>
          {vaultsToDisplay.map((vault: Vault) => (
            <a href="https://apeswap.finance/vaults" rel="noopener noreferrer" key={vault?.pid}>
              <VaultCardForHome vault={vault} key={vault?.pid} />
            </a>
          ))}
        </FarmWrapper>
      </ValuableVaultsWrapper>
    </>
  )
}

export default VauluableVaults
