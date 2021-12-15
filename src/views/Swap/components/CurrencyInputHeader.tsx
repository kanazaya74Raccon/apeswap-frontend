import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, IconButton, Text, useModal } from '@apeswapfinance/uikit'
import { useExpertModeManager } from 'state/user/hooks'

interface Props {
  title: string
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
}

const CurrencyInputContainer = styled(Flex)`
  align-items: center;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
`

const CurrencyInputHeader: React.FC<Props> = ({ title, subtitle, setIsChartDisplayed }) => {
  const [expertMode] = useExpertModeManager()
  const toggleChartDisplayed = () => {
    setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  }

  return (
    <CurrencyInputContainer>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h2" mb="8px">
            {title}
          </Heading>
          <Flex alignItems="center">
            <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <></>
        </Flex>
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
