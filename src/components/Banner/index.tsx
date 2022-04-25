import { Flex } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'
import { Text } from 'theme-ui'
import React from 'react'
import { styles } from './styles'
import { BannerTypes } from './types'

const Banner: React.FC<{ banner: BannerTypes; title?: string; children?: React.FC }> = ({
  banner,
  children,
  title,
}) => {
  const { isDark } = useTheme()
  return (
    <Flex
      sx={{
        ...styles.flexPrimary,
        backgroundImage: `url(/images/new-banners/${banner}-${isDark ? 'night' : 'day'}.svg)`,
      }}
    >
      <Flex sx={{ ...styles.titleContainer }}>
        <Text sx={{ ...styles.titleText }}>{title}</Text>
      </Flex>
      {children}
    </Flex>
  )
}

export default React.memo(Banner)
