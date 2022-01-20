import BigNumber from 'bignumber.js'
import { Contract, ethers } from 'ethers'
import { VaultApe, Iazo, SousChef, Masterchef, Erc20, MiniApeV2, Auction, NfaStaking } from 'config/abi/types'

export const approve = async (lpContract: Erc20, masterChefContract: Contract) => {
  return lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256).then((trx) => {
    return trx.wait()
  })
}

export const stake = async (masterChefContract: Masterchef, pid, amount) => {
  if (pid === 0) {
    return masterChefContract
      .enterStaking(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .then((trx) => {
        return trx.wait()
      })
  }

  return masterChefContract
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .then((trx) => {
      return trx.wait()
    })
}

export const sousStake = async (sousChefContract: SousChef, amount) => {
  return sousChefContract.deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((trx) => {
    return trx.wait()
  })
}

export const sousStakeBnb = async (sousChefContract: SousChef, amount) => {
  return sousChefContract.deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((trx) => {
    return trx.wait()
  })
}

export const unstake = async (masterChefContract: Masterchef, pid, amount) => {
  if (pid === 0) {
    return masterChefContract
      .leaveStaking(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .then((trx) => {
        return trx.wait()
      })
  }
  return masterChefContract
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .then((trx) => {
      return trx.wait()
    })
}

export const sousUnstake = async (sousChefContract: SousChef, amount) => {
  return sousChefContract.withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((trx) => {
    return trx.wait()
  })
}

export const sousEmegencyWithdraw = async (sousChefContract: SousChef) => {
  return sousChefContract.emergencyWithdraw().then((trx) => {
    return trx.wait()
  })
}

export const harvest = async (masterChefContract: Masterchef, pid) => {
  if (pid === 0) {
    return masterChefContract.leaveStaking('0').then((trx) => {
      return trx.wait()
    })
  }
  return masterChefContract.deposit(pid, '0').then((trx) => {
    return trx.wait()
  })
}

export const soushHarvest = async (sousChefContract: SousChef) => {
  return sousChefContract.deposit('0').then((trx) => {
    return trx.wait()
  })
}

export const bid = async (auctionContract: Auction, amount, id) => {
  return auctionContract
    .bid(id, { value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .then((trx) => {
      return trx.wait()
    })
  // .bid(id, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
  // .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
}

export const nextAuction = async (auctionContract: Auction, id) => {
  return auctionContract.endAuction(id).then((trx) => {
    return trx.wait()
  })
}

export const listNfa = async (
  auctionContract: Auction,
  id,
  auctionLength,
  timeToExtend,
  minimumExtendTime,
  minimumBid,
) => {
  return auctionContract
    .pushToAuction(
      id,
      auctionLength,
      timeToExtend,
      minimumExtendTime,
      new BigNumber(minimumBid).times(new BigNumber(10).pow(18)).toString(),
    )
    .then((trx) => {
      return trx.wait()
    })
}

export const removeAuction = async (auctionContract: Auction, id) => {
  return auctionContract.removeAuction(id).then((trx) => {
    return trx.wait()
  })
}

export const nfaStake = async (nfaStakingChefContract: NfaStaking, ids) => {
  return nfaStakingChefContract.deposit(ids).then((trx) => {
    return trx.wait()
  })
}

export const nfaStakeHarvest = async (nfaStakingChefContract: NfaStaking) => {
  return nfaStakingChefContract.deposit([]).then((trx) => {
    return trx.wait()
  })
}

export const nfaUnstake = async (nfaStakingChefContract: NfaStaking, ids) => {
  return nfaStakingChefContract.withdraw(ids).then((trx) => {
    return trx.wait()
  })
}

export const stakeVault = async (vaultApeContract: VaultApe, pid, amount) => {
  return vaultApeContract['deposit(uint256,uint256)'](
    pid,
    new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
  ).then((trx) => {
    return trx.wait()
  })
}

export const vaultUnstake = async (vaultApeContract: VaultApe, pid, amount) => {
  return vaultApeContract['withdraw(uint256,uint256)'](
    pid,
    new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
  ).then((trx) => {
    return trx.wait()
  })
}

export const vaultUnstakeAll = async (vaultApeContract: VaultApe, pid) => {
  return vaultApeContract.withdrawAll(pid).then((trx) => {
    return trx.wait()
  })
}

export const miniChefStake = async (miniChefContract: MiniApeV2, pid, amount, account) => {
  return miniChefContract
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account)
    .then((trx) => {
      return trx.wait()
    })
}

export const miniChefHarvest = async (miniChefContract: MiniApeV2, pid, account) => {
  return miniChefContract.harvest(pid, account).then((trx) => {
    return trx.wait()
  })
}

export const miniChefUnstake = async (miniChefContract: MiniApeV2, pid, amount, account) => {
  return miniChefContract
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account)
    .then((trx) => {
      return trx.wait()
    })
}

/* 
unitParams[9]
0: tokenPrice - string
1: amount - string (hardcap)
2: softCap - string
3: startTime - string (unix timstamp)
4: activeTime - number (seconds)
5: lockPeriod - number (seconds)
6: maxSpendPerBuyer - string
7: liquidityPercent - number
8: listingPrice - number (if 0 same as tokenPrice)
*/
export const createNewIazo = async (
  iazoFactoryContract, // Contract
  iazoOwner, // Address
  iazoToken, // Address
  baseToken, // Address
  burnRemains, // Bool
  unitParams, // uint256[9]
  creationFee, // string
) => {
  return iazoFactoryContract
    .createIAZO(iazoOwner, iazoToken, baseToken, burnRemains, unitParams, {
      value: creationFee,
    })
    .then((trx) => {
      return trx.wait()
    })
}

export const userDeposit = async (iazoContract: Iazo, amount) => {
  return iazoContract.userDeposit(amount).then((trx) => {
    return trx.wait()
  })
}

export const userDepositNative = async (iazoContract: Iazo, amount) => {
  return iazoContract.userDepositNative({ value: amount }).then((trx) => {
    return trx.wait()
  })
}

export const userWithdraw = async (iazoContract: Iazo) => {
  return iazoContract.userWithdraw().then((trx) => {
    return trx.wait()
  })
}

export const withdrawOfferTokensOnFailure = async (iazoContract: Iazo) => {
  return iazoContract.withdrawOfferTokensOnFailure().then((trx) => {
    return trx.wait()
  })
}
