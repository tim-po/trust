import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import {Row, SpaceBetweenRow, JustifyStartColumn, Column, AlignCenterRow} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import TrustButton from "Standard/components/TrustButton";
import ToggleDropdownButton from "icons/ToggleDropdownButton";
import DownloadIcon from "icons/DownloadIcon";

type DealItemPropType = {}

const DealItemDefaultProps = {}

const mockImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'

const DealWrapper = styled(Column)`
  background: #fff;
  width: 860px;
  box-shadow: 0 0 27px rgba(94, 103, 120, 0.1);
  border-radius: 16px;
  margin-bottom: 32px;
`

const DealHeader = styled(SpaceBetweenRow)`
  padding: 23px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const DealImage = styled.img`
  width: 50px;
  height: 50px;
`

const DealDescriptionItem = styled(JustifyStartColumn)`
  padding-left: 9px;
  border-left: 2px solid #33CC66;
  height: max-content;
`

const ButtonWrapper = styled.div`
  width: 120px;
`

const LearnMore = styled(SpaceBetweenRow)`
  padding: 13px 23px;
  cursor: pointer;
`

const AnimatedLearnMoreButton = styled.div<{ isActive: boolean }>`
  transition: all 0.3s;
  transform: ${p => p.isActive ? 'rotate(180deg)' : 'rotate(0deg)'};
  opacity: .3;
`

const CompanyDescriptionWrapper = styled(JustifyStartColumn)<{ isActive: boolean }>`
  transition: all .6s;
  overflow: ${p => p.isActive ? 'auto' : 'hidden'};
  height: ${p => p.isActive ? '410px' : '0px'};
`

const CompanyDescription = styled(JustifyStartColumn)`
  padding: 23px 26px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const CompanyPartners = styled(JustifyStartColumn)`
  padding: 18px 26px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const CompanyPresentation = styled(JustifyStartColumn)`
  padding: 21px 23px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const PresentationLink = styled.a`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #33CC66;
  
  &:hover {
    color: rgba(51, 204, 102, .6)
  }
`

const DealItem = (props: DealItemPropType) => {
  const {locale} = useContext(LocaleContext)

  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleLearnMoreButton = () => {
    setShowFullDescription(!showFullDescription)
  }

  return (
    <DealWrapper>
      <DealHeader>
        <Row gap={9}>
          <DealImage src={mockImage}/>
          <JustifyStartColumn>
            <Text fontWeight={600} fontSize={16}>Metamask</Text>
            <Text fontWeight={500} fontSize={14}>Cryptocurrency wallet</Text>
          </JustifyStartColumn>
        </Row>
        <Row gap={32}>
          <DealDescriptionItem>
            <Text fontWeight={500} fontSize={14}>Founded</Text>
            <Text fontWeight={600} fontSize={16}>2008</Text>
          </DealDescriptionItem>
          <DealDescriptionItem>
            <Text fontWeight={500} fontSize={14}>Total Funding</Text>
            <Text fontWeight={600} fontSize={16}>$314B</Text>
          </DealDescriptionItem>
          <DealDescriptionItem>
            <Text fontWeight={500} fontSize={14}>Headquarters</Text>
            <Text fontWeight={600} fontSize={16}>Los Angeles CA, US</Text>
          </DealDescriptionItem>
        </Row>
        <ButtonWrapper>
          <TrustButton style='green' isValid>
            <Text fontWeight={600} fontSize={16} color={'#fff'}>Invest</Text>
          </TrustButton>
        </ButtonWrapper>
      </DealHeader>
      <CompanyDescriptionWrapper isActive={showFullDescription}>
        <CompanyDescription>
          <Text fontWeight={600} fontSize={18}>About Metamask</Text>
          <Text fontWeight={400} fontSize={14}>A crypto wallet & gateway to blockchain apps</Text>
        </CompanyDescription>
        <CompanyPartners gap={20}>
          <JustifyStartColumn>
            <Text fontWeight={500} fontSize={14}>Battery Ventures</Text>
            <Text fontWeight={400} fontSize={14}>AppDynamics, Scopely, Dollar Shave Club, ServiceTitan, Cohesity, Niantic, 6sense, Nutanix, GrubMarket, StockX</Text>
          </JustifyStartColumn>
          <JustifyStartColumn>
            <Text fontWeight={500} fontSize={14}>Bessemer Venture Partners</Text>
            <Text fontWeight={400} fontSize={14}>PharmEasy, BigBasket, Swiggy, Pinterest, Snapdeal, Sila Nanotechnologies, ServiceTitan, Toast, Box, Procore Technologies</Text>
          </JustifyStartColumn>
          <JustifyStartColumn>
            <Text fontWeight={500} fontSize={14}>Dragoneer Investment Group</Text>
            <Text fontWeight={400} fontSize={14}>Flipkart, Spotify, Databricks, Airbnb, Instacart, Chime, DoorDash, UiPath, Nubank, Faire</Text>
          </JustifyStartColumn>
        </CompanyPartners>
        <CompanyPresentation>
          <Text fontWeight={500} fontSize={16}>Presentations</Text>
          <div className='mb-4' />
          <JustifyStartColumn>
            <AlignCenterRow gap={8}>
              <DownloadIcon />
              <PresentationLink>Metamask x MMP presentation.pdf</PresentationLink>
            </AlignCenterRow>
          </JustifyStartColumn>
        </CompanyPresentation>
      </CompanyDescriptionWrapper>
      <LearnMore onClick={toggleLearnMoreButton}>
        <Text fontWeight={500} fontSize={14} color={'rgba(24, 24, 51, .3)'}>Learn more</Text>
        <AnimatedLearnMoreButton isActive={showFullDescription}>
          <ToggleDropdownButton/>
        </AnimatedLearnMoreButton>
      </LearnMore>
    </DealWrapper>
  )
};

DealItem.defaultProps = DealItemDefaultProps

export default DealItem