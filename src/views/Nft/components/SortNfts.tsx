import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Nft } from 'config/constants/types'
import NftList from './NftList'

interface NftSortProps {
  nftSet: Nft[]
}

const SortHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  background-color: transparent;
  boxshadow: none;
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props) => props.theme.colors};
  color: ${(props) => props.theme.colors.textSubtle};
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 50px;
  font-size: 19px;
  z-index: 1;
  align-self: center;
`

const DropDownItem = styled.p`
  cursor: pointer;
  opacity: 0.8;
  font-family: 'Titan One';

  &:hover {
    opacity: 1;
  }
`

const DropDown = styled.div`
  &:hover ${DropDownContent} {
    display: block;
  }
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 10%;
  width: 140px;
  color: white;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 22.5px;
  cursor: pointer;
  margin: 0 20px 25px 0px;
  @media (max-width: 768px) {
    margin: 0 20px 25px 20px;
  }
`

const ResetArrow = styled.svg`
  cursor: pointer;
  fill: ${(props) => props.theme.colors.primary};
  width: 40px;
  height: 50px;
  @media (min-width: 768px) {
    margin-right: 20px;
  }
`

const SearchBoxHolder = styled.div`
  float: right;
  height: 50px;
  width: 280px;
  font-size: 30px;
  margin: 0 20px 25px 0px;
  @media (max-width: 768px) {
    margin: 0 20px 25px 20px;
  }
`

const SearchBox = styled.input`
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 20px;
  display: flex;
  border: none;
  -webkit-box-shadow: 0px 0px 5px 0px ${(props) => props.theme.colors.textSubtle};
  box-shadow: 0px 0px 5px 0px ${(props) => props.theme.colors.textSubtle};
  background-color: ${(props) => props.theme.colors};
  color: ${(props) => props.theme.colors.textSubtle};
  font-family: 'Titan One';

  &:focus {
    outline: none !important;
    border-color: ${(props) => props.theme.colors};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.textSubtle};
    text-align: center;
  }
`

const BackToTop = styled.button`
  position: sticky;
  bottom: 10px;
  left: 100%;
  width: 50px;
  cursor: pointer;
  height: 50px;
  fill: black;
  align-text: center;
  opacity: 0.8;
  border: none;
  color: white;
  border-radius: 50%;
  font-size: 30px;
  background-color: ${(props) => props.theme.colors.primary};
  &:focus {
    outline: none !important;
  }
`

const SortTitle = styled.p`
  font-family: 'Titan One';
  color: ${(props) => props.theme.colors.white};
`

const SortNfts: React.FC<NftSortProps> = ({ nftSet }) => {
  const [filterState, setFilterState] = useState(false)
  const [filterNftSet, setFilterNftSet] = useState(nftSet)
  const [endPagination, setEndPagination] = useState(50)
  const [nftToDisplay, setNftToDisplay] = useState(nftSet.slice(0, endPagination))
  const [currentFilterName, setCurrentFilterName] = useState('Filter')
  const [currentSortName, setCurrentSortName] = useState('Sort')

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const pageHeight = document.documentElement.offsetHeight
      const cardHeight = 293.333 * 5
      const scrollCheck = window.scrollY > pageHeight - cardHeight
      if (scrollCheck) {
        setEndPagination((pageNum) => pageNum + 50)
      }
    })
  }, [])

  useEffect(() => {
    if (endPagination <= 1000) {
      setNftToDisplay(filterNftSet.slice(0, endPagination))
    }
  }, [setNftToDisplay, filterNftSet, endPagination])

  const sortBy = (sortType) => {
    if (sortType === 'rarity') {
      const tempRaritySort = orderBy(filterNftSet, ['attributes.rarityOverallRank'])
      setFilterNftSet(tempRaritySort)
      setEndPagination(50)
      setCurrentSortName('Rarity')
    } else if (sortType === 'index') {
      const tempIndexSort = orderBy(filterNftSet, 'index')
      setFilterNftSet(tempIndexSort)
      setEndPagination(50)
      setCurrentSortName('Ape #')
    }
  }

  const filterBy = (tier) => {
    const tempFilter = nftSet.filter((nft) => {
      return nft.attributes.rarityTierNumber === tier
    })
    setFilterNftSet(tempFilter)
    setFilterState(true)
    setEndPagination(50)
    setCurrentSortName('Sort')
    setCurrentFilterName(`Tier ${tier}`)
  }

  const nextSet = () => {
    const tempFilter = nftSet.slice(851, 954)
    setFilterNftSet(tempFilter)
    setFilterState(true)
    setCurrentFilterName('Next Sale')
  }

  const resetFilter = () => {
    setFilterState(false)
    setFilterNftSet(nftSet)
    setEndPagination(50)
    setCurrentFilterName('Filter')
    setCurrentSortName('Sort')
    setNftToDisplay(orderBy(nftSet, 'index').slice(0, 50))
  }

  const search = (e) => {
    const tempFilter = nftSet.filter((nft) => {
      return nft.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilterNftSet(tempFilter)
    setEndPagination(50)
  }

  const backToTop = () => {
    setEndPagination(50)
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      <SortHolder>
        <DropDown>
          <SortTitle>{currentSortName}</SortTitle>
          <DropDownContent>
            <DropDownItem onClick={() => sortBy('index')}>Ape #</DropDownItem>
            <DropDownItem onClick={() => sortBy('rarity')}>Rarity</DropDownItem>
          </DropDownContent>
        </DropDown>
        <DropDown>
          <SortTitle>{currentFilterName}</SortTitle>
          <DropDownContent>
            <DropDownItem onClick={() => nextSet()}>Next Sale</DropDownItem>
            <DropDownItem onClick={() => filterBy(1)}>Tier 1</DropDownItem>
            <DropDownItem onClick={() => filterBy(2)}>Tier 2</DropDownItem>
            <DropDownItem onClick={() => filterBy(3)}>Tier 3</DropDownItem>
            <DropDownItem onClick={() => filterBy(4)}>Tier 4</DropDownItem>
            <DropDownItem onClick={() => filterBy(5)}>Tier 5</DropDownItem>
          </DropDownContent>
        </DropDown>
        {filterState && (
          <ResetArrow viewBox="0 0 15 15" onClick={() => resetFilter()}>
            <g>
              <path
                d="M12.083,1.887c-0.795-0.794-1.73-1.359-2.727-1.697v2.135c0.48,0.239,0.935,0.55,1.334,0.95
                c1.993,1.994,1.993,5.236,0,7.229c-1.993,1.99-5.233,1.99-7.229,0c-1.991-1.995-1.991-5.235,0-7.229
                C3.466,3.269,3.482,3.259,3.489,3.25h0.002l1.181,1.179L4.665,0.685L0.923,0.68l1.176,1.176C2.092,1.868,2.081,1.88,2.072,1.887
                c-2.763,2.762-2.763,7.243,0,10.005c2.767,2.765,7.245,2.765,10.011,0C14.844,9.13,14.847,4.649,12.083,1.887z"
              />
            </g>
          </ResetArrow>
        )}
        <SearchBoxHolder onChange={(e) => search(e)}>
          <SearchBox type="text" placeholder="Search by ape name" />
        </SearchBoxHolder>
      </SortHolder>
      <NftList nftSet={nftToDisplay} />
      {endPagination > 50 && <BackToTop onClick={() => backToTop()}>&#x2191;</BackToTop>}
    </>
  )
}

export default SortNfts
