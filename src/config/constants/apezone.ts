import { Ifo } from './types'

const ApeZone: { ifos: Ifo[] } = {
  ifos: [
    {
      id: 'bitfresh',
      address: '0x0aA255267CBE1cC9366509056A24608385F07617',
      isActive: false,
      name: 'Bitfresh',
      subTitle: 'The first community-driven iGaming platform where everyone wins.',
      description:
        'Bitfresh is a blockchain-based community driven social iGaming experience that pays dividends to players and token holders. The platform is filled with reward systems to give players many ways to win and earn over time.',
      launchDate: 'Apr. 24',
      launchTime: '03:00 UTC',
      saleAmount: '10,000,000 BFT',
      raiseAmount: '$100,000',
      bananaToBurn: '$50,000',
      projectSiteUrl: 'https://www.bitfresh.win/public-sale',
      currency: 'GNANA',
      currencyAddress: '0xdDb3Bd8645775F59496c821E4F55A7eA6A6dc299',
      tokenDecimals: 18,
      releaseBlockNumber: 6565331,
    },
    {
      id: 'aperocket',
      address: '0xF5413C7033ED5dF58b0F6A942BAEA1548a9AD2F4',
      isActive: false,
      name: 'ApeRocket',
      subTitle: 'DeFi yield farming aggregator and optimizer for Binance Smart Chain.',
      description:
        'ApeRocket Finance is a suite of products in Decentralized Finance (DeFi) that provides yield optimization strategies through the Binance Smart Chain, using ApeSwap liquidity.',
      launchDate: 'May. 25',
      launchTime: '03:00 UTC',
      saleAmount: '27,778 SPACE',
      raiseAmount: '$250,000',
      bananaToBurn: '$250,000',
      projectSiteUrl: 'https://aperocket.finance',
      currency: 'GNANA',
      currencyAddress: '0xddb3bd8645775f59496c821e4f55a7ea6a6dc299',
      tokenDecimals: 18,
      releaseBlockNumber: 7378325,
      // burnedTxUrl: 'https://bscscan.com/tx/0x938454e722fdef0a2f34b16f16bed50f6deb692b942331a9a6e2cf96977e116b',
    },
    {
      id: 'hifi',
      // address: '0x0dEFfe964CbCfBDA31251ADaa8DA6dA0961eba3C', // Leave empty for "Coming Soon!"
      address: '0xe3528182889afEAEADE455841b6CFE9AC1e53a03', // IAO Aux contract
      isActive: false,
      name: 'Hifi',
      subTitle: 'Decentralized retro gaming ecosystem.',
      description:
        'HiFi is a decentralized retro gaming ecosystem driven by its community. It uses staking and gameplay mining participation rewards to create a completely new DeFi gaming experience.',
      launchDate: 'June 11',
      launchTime: '03:00 UTC',
      saleAmount: '80,000,000 HIFI',
      raiseAmount: '$400,000',
      bananaToBurn: '$400,000',
      projectSiteUrl: 'https://hifigamingsociety.com/',
      currency: 'GNANA',
      currencyAddress: '0xddb3bd8645775f59496c821e4f55a7ea6a6dc299',
      tokenDecimals: 18,
      releaseBlockNumber: 8135430, // block to start showing contract details
      // burnedTxUrl: '',
    },
    {
      id: 'bishares',
      // address: '0xF9F1B0945A31FB2Ea429014e58fCA47dAEee4743', // Leave empty for "Coming Soon!"
      address: '', // IAO Aux contract!"
      isActive: true,
      name: 'BiShares',
      subTitle: 'Decentralized Index Funds',
      description:
        `BiShares is BSC's first Index Funds for safely diversifying across crypto assets. Use BNB to purchase a wide basket of assets and gain exposure to the broader crypto market. Never miss out on another moon again!`,
      launchDate: 'July 9th',
      launchTime: '03:00 UTC',
      saleAmount: '71429 BISON',
      raiseAmount: '$250,000',
      bananaToBurn: '$250,000',
      projectSiteUrl: 'https://bishares.finance/',
      currency: 'BNB',
      currencyAddress: '0x0000000000000000000000000000000000000000',
      tokenDecimals: 18,
      releaseBlockNumber: 8993971, // block to start showing contract details
      // burnedTxUrl: '',
    },
  ],
}

export default ApeZone
