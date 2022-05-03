import { Flex } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'
import { Link, Text } from 'theme-ui'
import useProgressiveImage from 'hooks/useProgressiveImage'
import React from 'react'
import { styles, FlexImage, LearnMoreArrow, FlexSkeleton } from './styles'
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
  const loaded = useProgressiveImage(`images/new-banners/${banner}-${isDark ? 'night' : 'day'}.svg`)

  // Media breaks are used until tablet mode on list view is designed
  return (
    <Flex sx={{ ...styles.flexPrimary, margin }}>
      {loaded ? (
        <FlexImage sx={{ backgroundImage: `url(${loaded})` }} maxWidth={maxWidth} listViewBreak={listViewBreak} />
      ) : (
        <FlexSkeleton maxWidth={maxWidth} listViewBreak={listViewBreak} />
      )}
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
          <span style={{ textDecoration: 'underline' }}>Learn More</span>{' '}
          <LearnMoreArrow color={titleColor || 'text'} />
        </Link>
      </Flex>
      {children}
    </Flex>
  )
}

export default React.memo(Banner)
