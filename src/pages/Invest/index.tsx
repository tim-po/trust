import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import InvestBackground from "icons/InvestBackground";
import SubHeader from "components/SubHeader";
import styled from "styled-components";
import DealItem from "components/DealItem";
import {API_URL} from "../../api/constants";
import {useCookies} from "react-cookie";
import {IOffer} from 'types/Offer';

type InvestPropType = {}

const InvestDefaultProps = {}

const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
`

const Invest = (props: InvestPropType) => {
  const {locale} = useContext(LocaleContext)

  const [offers, setOffers] = useState<IOffer[] | undefined>(undefined)

  const [cookies] = useCookies(['auth'])

  const getOffers = async () => {
    const offersUrl = `${API_URL}/api/Investments`

    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
    }

    fetch(offersUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setOffers(json.data.investments)
      })
  }

  useEffect(() => {
    getOffers()
  },[])

  return (
    <Container>
      <SubHeader
        backgroundIcon={<InvestBackground />}
        greenTitle={localized(texts.invest, locale)}
      />
      {offers && offers.map(offer =>
        <div key={offer.id}>
          <DealItem offer={offer}/>
        </div>
      )}
    </Container>
  )
};

Invest.defaultProps = InvestDefaultProps

export default Invest

