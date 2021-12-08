import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, Image } from '@apeswapfinance/uikit'
import { ifosConfig, zoneIfo } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoProjectCard from './components/IfoCard/IfoProjectCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const activeIfo = ifosConfig.find((ifo) => ifo.isActive)
const zoneActiveIfo = zoneIfo.find((ifo) => ifo.isActive)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <div>
      {/* <IfoCards isSingle={false}> */}
      <IfoProjectCard ifo={activeIfo} />
      {/* <IfoCard ifo={zoneActiveIfo} notLp gnana /> */}
      {/* </IfoCards> */}
    </div>
  )
}

export default Ifo
