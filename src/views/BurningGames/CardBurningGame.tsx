import React, { useState } from 'react'
import { Card, Text, Button, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'

interface DropdownProps {
  down?: boolean
}

const ColumnFull = styled(Card)<{ showDescription: boolean }>`
  border-radius: 5px;
  text-align: center;
  width: 100%;
  margin-bottom: 25px;
  display: grid;
  height: ${(props) => (props.showDescription ? '450px !important' : '235px')};
  padding: 16px;
`
const ContainerGeneral = styled.div`
  display: flex;
  height: 200px;
`
const ContainerDescription = styled.div`
  position: relative;
  height: 225px;
  padding-top: 25px;
  font-size: 22px;
  text-align: left;

  .social-description {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0px;
  }

  .content-description {
    padding-top: 8px;
    color: #af6e5aff;
    font-size: 14px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 1.5;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    .content-description {
      font-size: 16px;
    }
  }
`
const ButtonSocial = styled(Button)`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #ffb300;
  margin-right: 10px;
  border-radius: 15px;
  padding-top: 12px;
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 100px;
  }
`
const FullImage = styled.div<{ pathImage: string; }>`
  margin-right: 15px;
  width: 50%;
  height: 100%;
  background-image: url(${(props) => props.pathImage || ''});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 7px;
`
const ContainerTitle = styled.div`
  display: grid;
  justify-content: flex-start;
  text-align: left;
  line-height: 1.5;
  .partner-name {
    color: #939393;
    font-size: 15px;
  }
  .sub-name {
    font-size: 18px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    .partner-name {
      font-size: 24px;
    }
    .sub-name {
      font-size: 32px;
    }
  }
`

const ContainerResumeInfo = styled.div`
  padding-top: 10px;
  position: relative;
  width: 50%;
  height: 100%;
  border-radius: 7px;
  .buttons {
    position: absolute;
    width: 100%;
    bottom: 0px;
    display: flex;
  }
`
const PlayButton = styled(Button)`
  width: 100%;
  height: 35px;
  background: #ffb300;
  border-radius: 10px;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
`
const PlayText = styled(Text)`
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`
const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)<DropdownProps>`
  transform: ${({ down }) => (!down ? 'rotate(180deg)' : 'rotate(0)')};
  margin-left: 15px;
  margin-top: 2px;
  'rotate(180deg)':'rotate(0)'cursor: pointer;
`
const CardBurningGame: React.FC<any> = ({ game }) => {
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  return (
    <>
      <ColumnFull className="column-full" key={game.id} showDescription={sortDirection === 'asc'}>
        <ContainerGeneral className="container-general">
          <FullImage pathImage={game.image?.url} />
          <ContainerResumeInfo className="container-resumen-info">
            <ContainerTitle className="container-title">
              <Text className="partner-name" fontFamily="poppins" bold>
                {game.name}
              </Text>
              <Text className="sub-name" fontFamily="poppins" bold>
                {game.subtitle}
              </Text>
            </ContainerTitle>
            <div className="buttons">
              <PlayButton as="a" href={game.link} target="_blank">
                <PlayText color="white">OPEN DAPP</PlayText>
              </PlayButton>
              <StyledArrowDropDownIcon
                width="27px"
                height="28px"
                down={sortDirection === 'desc'}
                onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
              />
            </div>
          </ContainerResumeInfo>
        </ContainerGeneral>
        <ContainerDescription>
          <Text fontFamily="poppins" bold fontSize="17">
            {game.subtitle}
          </Text>
          <div className="content-description">{game.description}</div>
          <div className="social-description">
            {game.twitter && (
              <ButtonSocial as="a" href={game.twitter} target="_blank">
                <img src="/images/social/twitter.svg" alt="twitter" />
              </ButtonSocial>
            )}
            {game.telegram && (
              <ButtonSocial as="a" href={game.telegram} target="_blank">
                <img src="/images/social/telegram.svg" alt="telegram" />
              </ButtonSocial>
            )}
          </div>
        </ContainerDescription>
      </ColumnFull>
    </>
  )
}

export default CardBurningGame
