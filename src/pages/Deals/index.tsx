import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import SubHeader from "../../components/SubHeader";
import ManageBackground from "../../icons/ManageBackground";
import IosStyleSegmentedControll from "../../Standard/components/IosStyleSegmentedControll";
import {
  JustifyStartColumn,
  StartRow,
  JustifyCenterColumn
} from "../../Standard/styles/GlobalStyledComponents";
import Text from "../../Standard/components/Text";
import {useHistory} from "react-router-dom";
import {RouteName} from "../../router";
import {API_URL} from "../../api/constants";
import {useCookies} from "react-cookie";
import {IDeal} from "../../types/ManageStatus";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";;

type DealsPropType = {}

const AllDealsDefaultProps = {}

const mockImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px 15%;
  width: 100%;
  z-index: 1;
`

const DealsPanelWrapper = styled(JustifyCenterColumn)`
  //max-width: 1200px;
`

const CurrentDeal = styled(StartRow)`
  background: #fff;
  box-shadow: 0 0 27px rgba(94, 103, 120, 0.1);
  border-radius: 16px;
  min-width: 300px;
  z-index: 10;
  margin-bottom: 16px;
  margin-right: 16px;
  cursor: pointer;
`

const DealImage = styled.img`
  width: 50px;
  height: 50px;
`

const DealDescription = styled(StartRow)`
  padding: 27px 20px;
  border-right: 1px solid rgba(24, 24, 51, .1);
`

const DealStatus = styled(JustifyStartColumn)`
  padding: 27px 20px;
`

const AllDeals = (props: DealsPropType) => {
  const {locale} = useContext(LocaleContext)

  const [activeButton, setActiveButton] = useState<number>(0)
  const [allActiveDeals, setAllActiveDeals] = useState<IDeal[] | undefined>(undefined)
  const [allClosedDeals, setAllClosedDeals] = useState<IDeal[] | undefined>(undefined)

  const buttons = [`Active (${allActiveDeals?.length})`, `Closed (${allClosedDeals?.length})`]

  const [cookies] = useCookies(['auth'])
  const history = useHistory()

  const getAllDeals = async () => {
    const allDealsUrl = `${API_URL}/api/transaction`

    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
    }

    fetch(allDealsUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          const activeDeals = json.data.transactions.filter((deal: IDeal) => deal.stage !== 'closed')
          const closedDeals = json.data.transactions.filter((deal: IDeal) => deal.stage === 'closed')
          setAllActiveDeals(activeDeals)
          setAllClosedDeals(closedDeals)
        }
      })
  }

  useEffect(() => {
    getAllDeals()
  }, [])

  return (
    <Container>
      <SubHeader
        backgroundIcon={<ManageBackground/>}
        greenTitle={localized(texts.manage, locale)}
      />
      <DealsPanelWrapper>
        <IosStyleSegmentedControll
          width={400} buttons={buttons}
          firstSelectedIndex={activeButton}
          onChange={setActiveButton}
        />
        <StartRow>
          <>
            {allActiveDeals && activeButton === 0 && allActiveDeals.filter((deal: any) => deal.stage !== 'closed').map(deal =>
              <CurrentDeal
                key={deal.transactionId}
                gap={9}
                onClick={() => history.push(`${RouteName.ALL_DEALS}/${deal.transactionId}`)}
              >
                <DealDescription gap={9}>
                  <DealImage src={`${API_URL}/investmentStatic/${deal.investment.logo}'`}/>
                  <JustifyStartColumn>
                    <Text fontWeight={600} fontSize={16}>{deal.investment.name}</Text>
                    <ReactMarkdown children={deal.investment.subtitle} rehypePlugins={[rehypeRaw]} />
                  </JustifyStartColumn>
                </DealDescription>
                <DealStatus>
                  <Text fontWeight={500} fontSize={20}>Status</Text>
                  <Text fontWeight={400} fontSize={14}>Closed</Text>
                </DealStatus>
              </CurrentDeal>
            )}
          </>
          <>
            {allClosedDeals && activeButton === 1 && allClosedDeals.filter((deal: any) => deal.stage === 'closed').map(deal =>
              <CurrentDeal
                key={deal.transactionId}
                gap={9}
                onClick={() => history.push(`${RouteName.ALL_DEALS}/${deal.transactionId}`)}
              >
                <DealDescription gap={9}>
                  <DealImage src={mockImage}/>
                  <JustifyStartColumn>
                    <Text fontWeight={600} fontSize={16}>{deal.investment.name}</Text>
                    <ReactMarkdown children={deal.investment.subtitle} rehypePlugins={[rehypeRaw]} />
                  </JustifyStartColumn>
                </DealDescription>
                <DealStatus>
                  <Text fontWeight={500} fontSize={20}>Status</Text>
                  <Text fontWeight={400} fontSize={14}>Closed</Text>
                </DealStatus>
              </CurrentDeal>
            )}
          </>
        </StartRow>
      </DealsPanelWrapper>
    </Container>
  )
};

AllDeals.defaultProps = AllDealsDefaultProps

export default AllDeals

