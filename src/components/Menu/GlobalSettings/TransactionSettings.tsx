import React, { useState } from 'react'
import { escapeRegExp } from 'utils'
import { Text, Input, Flex } from '@apeswapfinance/uikit'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import styled from '@emotion/styled'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')
  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    if (value === '' || inputRegex.test(escapeRegExp(value))) {
      setSlippageInput(value)

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
        if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
          setUserSlippageTolerance(valueAsIntFromRoundedFloat)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="24px">
        <Flex mb="12px">
          <Text>{t('Slippage Tolerance')}</Text>
        </Flex>
        <Flex flexWrap="wrap">
          <SelectButton
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(10)
            }}
            active={userSlippageTolerance === 10}
          >
            0.1%
          </SelectButton>
          <SelectButton
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(50)
            }}
            active={userSlippageTolerance === 50}
          >
            0.5%
          </SelectButton>
          <SelectButton
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(100)
            }}
            active={userSlippageTolerance === 100}
          >
            1.0%
          </SelectButton>
          <Flex alignItems="center">
            <Flex style={{ position: 'relative' }}>
              <StyledInput
                inputMode="decimal"
                pattern="^[0-9]*[.,]?[0-9]{0,2}$"
                placeholder={(userSlippageTolerance / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                }}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) {
                    parseCustomSlippage(event.target.value.replace(/,/g, '.'))
                  }
                }}
                isWarning={!slippageInputIsValid}
              />
              <Text style={{ position: 'absolute', right: '10px', marginTop: '2px' }}>%</Text>
            </Flex>
          </Flex>
        </Flex>
        {!!slippageError && (
          <Text fontSize="14px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text>{t('Tx deadline (mins)')}</Text>
        <StyledInput
          inputMode="numeric"
          pattern="^[0-9]+$"
          color={deadlineError && 'red'}
          onBlur={() => {
            parseCustomDeadline((ttl / 60).toString())
          }}
          placeholder={(ttl / 60).toString()}
          value={deadlineInput}
          onChange={(event) => {
            if (event.currentTarget.validity.valid) {
              parseCustomDeadline(event.target.value)
            }
          }}
        />
      </Flex>
    </Flex>
  )
}

const StyledInput = styled(Input)`
  width: 120px;
  height: 28px;
  color: ${(props) => props.theme.colors.text};
  outline: none;
  :focus {
    outline: 2px solid rgba(255, 179, 0, 1) !important;
    border: none !important;
    box-shadow: none !important;
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
`
const SelectButton = styled.div<{ active: boolean }>`
  display: flex;
  width: 56px;
  height: 28px;
  background: ${(props) => (props.active ? 'rgba(255, 179, 0, 1)' : props.theme.colors.inputBorder)};
  color: ${(props) => (props.active ? 'white' : props.theme.colors.primary)};
  border-radius: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0 7px 0 0px;
`

export default SlippageTabs
