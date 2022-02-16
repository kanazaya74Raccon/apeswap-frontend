import { CHAIN_ID } from 'config/constants/chains'
import SwiperProvider from 'contexts/SwiperProvider'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import LaunchCalendar from './components/LaunchCalendar/LaunchCalendar'
import News from './components/News/News'
import Services from './components/Services/Services'
import StatCards from './components/StatCards/StatCards'
import TrendingTokens from './components/TrendingTokens/TrendingTokens'
import Values from './components/Values/Values'
import WelcomeContent from './components/WelcomeContent/WelcomeContent'
import { Banner } from './styles'

const Home: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <div style={{ border: '1px solid red', width: '100%' }}>
      <SwiperProvider>
        <Banner />
        <WelcomeContent />
        <StatCards />
        <TrendingTokens />
        <News />
        {chainId === CHAIN_ID.BSC && <Services />}
        <Values />
        <LaunchCalendar />
      </SwiperProvider>
    </div>
  )
}

export default Home
