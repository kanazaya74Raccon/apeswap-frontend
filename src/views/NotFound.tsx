import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const { t } = useTranslation()

  // 07611943d

  return (
    <Page>
      <StyledNotFound>
        <img src="images/lost-monkey.svg" alt="404" />
        <Heading>404</Heading>
        <Text mb="16px">{t('Oops, page not found.')}</Text>
        <Button as="a" href="/" size="sm">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
