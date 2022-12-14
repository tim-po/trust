import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import SubHeader from "components/SubHeader";
import styled from "styled-components";
import ManageBackground from "icons/ManageBackground";
import {Row, JustifyStartColumn, StartRow} from "Standard/styles/GlobalStyledComponents";
import Text from 'Standard/components/Text';
import DealControlling from "components/DealControlling";
import ReturnPanel from "components/ReturnPanel";
import {RouteName} from "router";
import {API_URL} from "api/constants";
import {useParams} from "react-router";
import {useCookies} from "react-cookie";
import {IDeal} from "types/ManageStatus";
import {useCurrentDeal} from "hooks/useCurrentDeal";

type ManagePropType = {}

const ManageDefaultProps = {}

const mockImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 36px;
  width: 100%;
  z-index: 1;
`

const CurrentDeal = styled(StartRow)`
  background: #fff;
  box-shadow: 0 0 27px rgba(94, 103, 120, 0.1);
  border-radius: 16px;
  padding: 27px 20px;
  width: 300px;
  z-index: 10;
  margin-bottom: 16px;
`

const ManagePanelWrapper = styled(JustifyStartColumn)`
  padding-left: 20%;
  padding-right: 20%;
`

const DealImage = styled.img`
  width: 50px;
  height: 50px;
`

const Timer = styled(StartRow)`
  justify-content: flex-start;
  background: #fff;
  box-shadow: 0 0 27px rgba(94, 103, 120, 0.1);
  border-radius: 16px;
  padding: 27px 20px;
  width: 300px;
  z-index: 10;
`

const Manage = (props: ManagePropType) => {
  const {locale} = useContext(LocaleContext)
  const params:{ id: string } = useParams()

  const {fetchCurrentDeal, currentDeal, nextStep} = useCurrentDeal(params.id)

  useEffect(() => {
    fetchCurrentDeal()
  }, [])
  console.log(currentDeal)
  return (
    <Container>
      <SubHeader
        backgroundIcon={<ManageBackground/>}
        greenTitle={localized(texts.manage, locale)}
      />
      <ManagePanelWrapper>
        <ReturnPanel appUrl={RouteName.ALL_DEALS} title={'DEALS'} />
        <div className={'mb-5'} />
        <Row gap={16}>
          <JustifyStartColumn>
            <CurrentDeal gap={9}>
              <DealImage src={`${API_URL}/dist/investmentsStatic/${currentDeal?.investment?.logoPath}`.replaceAll(' ', '%20')} />
              <JustifyStartColumn>
                <Text fontWeight={600} fontSize={16}>{currentDeal?.investment?.name}</Text>
                <Text fontWeight={500} fontSize={14}>{currentDeal?.investment?.aboutSubtitle}</Text>
              </JustifyStartColumn>
            </CurrentDeal>
            {currentDeal && currentDeal.nextClose && currentDeal.stage !== 'closed' &&
              <Timer gap={9}>
                <Text fontWeight={400} fontSize={16}>You must pay by {currentDeal.nextClose}</Text>
              </Timer>
            }
          </JustifyStartColumn>
          <DealControlling currentDeal={currentDeal} nextStep={nextStep}/>
        </Row>
      </ManagePanelWrapper>
    </Container>
  )
};

Manage.defaultProps = ManageDefaultProps

export default Manage

