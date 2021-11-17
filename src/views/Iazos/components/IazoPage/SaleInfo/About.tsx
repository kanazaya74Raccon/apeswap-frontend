import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

const AboutWrapper = styled.div`
  display: flex;
  height: 60px;
  width: 796px;
  margin-bottom: 20px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 0px 0px 10px 10px;
`

const About: React.FC = () => {
  return <AboutWrapper />
}

export default About
