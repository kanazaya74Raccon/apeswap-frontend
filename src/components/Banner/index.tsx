import { Flex } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'
import { Link, Text } from 'theme-ui'
import React from 'react'
import { styles, FlexImage, LearnMoreArrow } from './styles'
import { BannerTypes, ColorProps } from './types'

const Banner: React.FC<{
  banner: BannerTypes
  title?: string
  children?: React.FC
  listViewBreak?: boolean
  margin?: string
  titleColor?: ColorProps
  maxWidth?: number
}> = ({ banner, children, title, listViewBreak, margin, titleColor, maxWidth = 1200 }) => {
  const { isDark } = useTheme()

  // Media breaks are used until tablet mode on list view is designed
  return (
    <Flex sx={{ ...styles.flexPrimary, margin }}>
      <FlexImage
        sx={{
          backgroundImage: `url(images/new-banners/${banner}-${isDark ? 'night' : 'day'}.svg)`,
          '@media screen and (min-width: 500px) and (max-width: 851px)': {
            height: listViewBreak ? '120px' : '24vw',
          },
        }}
        maxWidth={maxWidth}
      />
      <Flex sx={{ ...styles.titleContainer }}>
        <Text
          sx={{
            ...styles.titleText,
            color: titleColor || 'text',
            '@media screen and (min-width: 500px) and (max-width: 851px)': {
              fontSize: listViewBreak ? '25px' : '5vw',
              lineHeight: listViewBreak ? '25px' : '5vw',
            },
          }}
        >
          {title.toUpperCase()}
        </Text>
        <Link
          sx={{ ...styles.learnText, color: titleColor || 'text', ':hover': { textDecoration: 'none' } }}
          href="/spinner"
        >
          <span style={{ textDecoration: 'underline' }}>Learn More</span> <LearnMoreArrow />
        </Link>
      </Flex>
      {children}
    </Flex>
  )
}

export default React.memo(Banner)
