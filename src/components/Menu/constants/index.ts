import { BASE_EXCHANGE_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

export const HOME = {
  label: 'Home',
  icon: 'HomeIcon',
  href: '/',
}

export const EXCHANGE = {
  label: 'Trade',
  icon: 'TradeIcon',
  items: [
    {
      label: 'Exchange',
      href: BASE_EXCHANGE_URL,
    },
    {
      label: 'Liquidity',
      href: BASE_LIQUIDITY_POOL_URL,
    },
  ],
}

export const MORE_INFO = {
  label: 'More',
  icon: 'MoreIcon',
  items: [
    {
      label: 'Governance',
      href: 'https://vote.apeswap.finance',
    },
    {
      label: 'Github',
      href: 'https://github.com/apeswapfinance',
    },
    {
      label: 'Docs',
      href: 'https://apeswap.gitbook.io/apeswap-finance/',
    },
    {
      label: 'Blog',
      href: 'https://ape-swap.medium.com/',
    },
    {
      label: 'Partnership Application',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSdiC4jpKQAYD4iALGrm9ErmDIs1xtsOENu9GsvgdczVwe_uOw/viewform?usp=sf_link',
    },
    {
      label: 'ApeTV',
      href: 'https://anchor.fm/apetv',
    },
    {
      label: 'ApeLabs',
      href: 'https://www.apelabs.education',
    },
    {
      label: 'Bug Bounty Program',
      href: 'https://apeswap.gitbook.io/apeswap-finance/security/bug-bounty-program',
    },
  ],
}
