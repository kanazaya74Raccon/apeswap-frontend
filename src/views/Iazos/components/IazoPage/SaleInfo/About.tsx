import React from 'react'
import { AboutWrapper } from './styles'

interface AboutProps {
  description: string
}

const About: React.FC<AboutProps> = ({ description }) => {
  return <AboutWrapper>{description}</AboutWrapper>
}

export default About
