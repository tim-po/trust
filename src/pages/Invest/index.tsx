import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import GradientCircles from "Standard/decorations/GradientCircles";
import InvestBackground from "icons/InvestBackground";
import SubHeader from "components/SubHeader";
import styled from "styled-components";

type InvestPropType = {}

const InvestDefaultProps = {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
`

const Invest = (props: InvestPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <Container>
      <SubHeader
        backgroundIcon={<InvestBackground />}
        greenTitle={localized(texts.invest, locale)}
      />
    </Container>
  )
};

Invest.defaultProps = InvestDefaultProps

export default Invest

