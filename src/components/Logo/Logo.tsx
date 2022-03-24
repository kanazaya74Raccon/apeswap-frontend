import React, { useState } from 'react'
import { Skeleton } from '@apeswapfinance/uikit'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcs: string[]
  width?: number
  height?: number
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const Logo: React.FC<LogoProps> = ({ srcs, alt, width, height, ...rest }) => {
  const [, refresh] = useState<number>(0)

  const src: string | undefined = srcs.find((s) => !BAD_SRCS[s])

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        width={`${width}px`}
        height={`${height}px`}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
      />
    )
  }

  return <Skeleton {...rest} variant="circle" animation="waves" />
}

export default React.memo(Logo)
