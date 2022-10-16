import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import { Row, SpaceBetweenRow, JustifyStartColumn, Column, AlignCenterRow } from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import TrustButton from "Standard/components/TrustButton";
import ToggleDropdownButton from "icons/ToggleDropdownButton";
import DownloadIcon from "icons/DownloadIcon";
import {IOffer} from "types/Offer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {API_URL} from "../../api/constants";
import {useCookies} from "react-cookie";

type DealItemPropType = {
  offer: IOffer
}

const DealItemDefaultProps = {}

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
  transition: all .4s;
  height: ${p => !p.isActive && '0px'};
  transform: ${p => p.isActive ? 'scaleY(1)' : 'scaleY(0)'};
  overflow: ${p => p.isActive ? 'auto' : 'hidden'};
`

const CompanyDescription = styled(JustifyStartColumn)`
  padding: 23px 26px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const CompanyPartners = styled(JustifyStartColumn)`
  padding: 18px 26px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const CompanyPresentation = styled(AlignCenterRow)`
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
  const {offer} = props

  const [cookies] = useCookies(['auth'])

  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleLearnMoreButton = () => {
    setShowFullDescription(!showFullDescription)
  }

  const createDeal = async () => {
    const createDealUrl = `${API_URL}/api/transaction/create`

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
      body: JSON.stringify({
        investmentId: offer.id
      })
    }

    fetch(createDealUrl, requestOptions)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <DealWrapper>
      <DealHeader>
        <Row gap={9}>
          <DealImage src={`http://localhost:7002/investmentsStatic/${offer.logoPath}`}/>
          <JustifyStartColumn>
            <Text fontWeight={600} fontSize={16}>{offer.name}</Text>
            <Text fontWeight={500} fontSize={14}>{offer.aboutSubtitle}</Text>
          </JustifyStartColumn>
        </Row>
        <Row gap={32}>
          {offer.headerLabelFirst && offer.headerTextFirst &&
            <DealDescriptionItem>
              <Text fontWeight={500} fontSize={14}>{offer.headerLabelFirst}</Text>
              <Text fontWeight={600} fontSize={16}>{offer.headerTextFirst}</Text>
            </DealDescriptionItem>
          }
          {offer.headerLabelSecond && offer.headerTextSecond &&
            <DealDescriptionItem>
              <Text fontWeight={500} fontSize={14}>{offer.headerLabelSecond}</Text>
              <Text fontWeight={600} fontSize={16}>{offer.headerTextSecond}</Text>
            </DealDescriptionItem>
          }
          {offer.headerTextThird && offer.headerLabelThird &&
            <DealDescriptionItem>
              <Text fontWeight={500} fontSize={14}>{offer.headerLabelThird}</Text>
              <Text fontWeight={600} fontSize={16}>{offer.headerTextThird}</Text>
            </DealDescriptionItem>
          }
        </Row>
        <ButtonWrapper>
          {offer.isActive ?
            <TrustButton style='green' isValid onClick={createDeal}>
              <Text fontWeight={600} fontSize={16} color={'#fff'}>Invest</Text>
            </TrustButton>
            :
            <Text fontWeight={500} fontSize={16} color={'#33CC66'}>Coming soon</Text>
          }
        </ButtonWrapper>
      </DealHeader>
      <CompanyDescriptionWrapper isActive={showFullDescription}>
        <CompanyDescription>
          <Text fontWeight={600} fontSize={18}>About {offer.name}</Text>
          <Text fontWeight={400} fontSize={14}>{offer.aboutSubtitle}</Text>
        </CompanyDescription>
        <CompanyPartners>
          <ReactMarkdown children={offer.description} rehypePlugins={[rehypeRaw]} />
        </CompanyPartners>
        <CompanyPresentation gap={10}>
          <DownloadIcon/>
          <PresentationLink href={`http://134.209.181.150:7002/investmentsStatic/${offer.presentationPath}`} target="_blank">{offer.presentationLabel}</PresentationLink>
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