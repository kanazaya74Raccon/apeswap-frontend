import { Flex } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'
import { Image, Link, Text } from 'theme-ui'
import React from 'react'
import { styles } from './styles'
import { BannerTypes, ColorProps } from './types'

const Banner: React.FC<{
  banner: BannerTypes
  title?: string
  children?: React.FC
  listViewBreak?: boolean
  margin?: string
  titleColor?: ColorProps
}> = ({ banner, children, title, listViewBreak, margin, titleColor }) => {
  const { isDark } = useTheme()

  // Media breaks are used until tablet mode on list view is designed
  return (
    <Flex sx={{ ...styles.flexPrimary, margin }}>
      <Image src={`/images/new-banners/${banner}-${isDark ? 'night' : 'day'}.svg`} sx={{ ...styles.imagePrimary }} />
      <Flex sx={{ ...styles.titleContainer }}>
        <Text
          sx={{
            ...styles.titleText,
            color: titleColor || 'text',
            '@media screen and (min-width: 500px) and (max-width: 851px)': {
              fontSize: listViewBreak ? '20px' : '4vw',
              lineHeight: listViewBreak ? '20px' : '5vw',
            },
          }}
        >
          {title.toUpperCase()}
        </Text>
        <Link sx={{ ...styles.learnText, color: titleColor || 'text' }} href="/spinner">
          Learn More
        </Link>
      </Flex>
      {children}
    </Flex>
  )
}

export default React.memo(Banner)
