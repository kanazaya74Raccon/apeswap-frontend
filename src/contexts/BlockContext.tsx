import useWeb3 from 'hooks/useWeb3'
import React, { useState, useEffect, useRef } from 'react'

const BlockContext = React.createContext(0)

const BlockContextProvider = ({ children }) => {
  const previousBlock = useRef(0)
  const [block, setBlock] = useState(0)
  const web3 = useWeb3()

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      if (blockNumber !== previousBlock.current) {
        previousBlock.current = blockNumber
        setBlock(blockNumber)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [web3])

  return <BlockContext.Provider value={block}>{children}</BlockContext.Provider>
}

export { BlockContext, BlockContextProvider }
