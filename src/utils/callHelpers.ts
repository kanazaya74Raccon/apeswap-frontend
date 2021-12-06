import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .enterStaking(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmegencyWithdraw = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking('0')
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const bid = async (auctionContract, amount, id, account) => {
  return auctionContract.methods
    .bid(id)
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const nextAuction = async (auctionContract, id, account) => {
  return auctionContract.methods
    .endAuction(id)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const listNfa = async (
  auctionContract,
  id,
  auctionLength,
  timeToExtend,
  minimumExtendTime,
  minimumBid,
  account,
) => {
  return auctionContract.methods
    .pushToAuction(
      id,
      auctionLength,
      timeToExtend,
      minimumExtendTime,
      new BigNumber(minimumBid).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const removeAuction = async (auctionContract, id, account) => {
  return auctionContract.methods
    .removeAuction(id)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const nfaStake = async (nfaStakingChefContract, ids, account) => {
  return nfaStakingChefContract.methods
    .deposit(ids)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const nfaStakeHarvest = async (nfaStakingChefContract, account) => {
  return nfaStakingChefContract.methods
    .deposit([])
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const nfaUnstake = async (nfaStakingChefContract, ids, account) => {
  return nfaStakingChefContract.methods
    .withdraw(ids)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stakeVault = async (vaultApeContract, pid, amount, account) => {
  return vaultApeContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const vaultUnstake = async (vaultApeContract, pid, amount, account) => {
  return vaultApeContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const vaultUnstakeAll = async (vaultApeContract, pid, account) => {
  return vaultApeContract.methods
    .withdrawAll(pid)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const miniChefStake = async (miniChefContract, pid, amount, account) => {
  return miniChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const miniChefHarvest = async (miniChefContract, pid, account) => {
  return miniChefContract.methods
    .harvest(pid, account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const miniChefUnstake = async (miniChefContract, pid, amount, account) => {
  return miniChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
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
  return iazoFactoryContract.methods
    .createIAZO(iazoOwner, iazoToken, baseToken, burnRemains, unitParams)
    .send({ from: iazoOwner, value: creationFee })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const userDeposit = async (iazoContract, amount, account) => {
  return iazoContract.methods
    .userDeposit(amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const userDepositNative = async (iazoContract, amount, account) => {
  return iazoContract.methods
    .userDepositNative()
    .send({ from: account, value: amount })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const userWithdraw = async (iazoContract, account) => {
  return iazoContract.methods
    .userWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const withdrawOfferTokensOnFailure = async (iazoContract, account) => {
  return iazoContract.methods
    .withdrawOfferTokensOnFailure()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
