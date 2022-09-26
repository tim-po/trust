import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import {AlignCenterRow, JustifyStartColumn, SpaceBetweenRow, ButtonV3} from 'styles/GlobalStyledComponents'
import Text from 'components/Text'
import FAQTile from "components/FAQTile";

type FAQPropType = {}

const FAQDefaultProps = {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
`

const FAQ = (props: FAQPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <Container>
      <JustifyStartColumn>
        <JustifyStartColumn gap={14}>
          <Text fontWeight={600} fontSize={45} color={'#33CC66'}>Contact Us</Text>
          <Text fontWeight={500} fontSize={20}>If you have any issues or questions please contact us.</Text>
          <Text fontWeight={400} fontSize={16}>You will get a reply within 10 working days</Text>
          <ButtonV3 buttonStyle='green'>Send us an email</ButtonV3>
        </JustifyStartColumn>
        <div className='mt-10'/>
        <Text fontWeight={600} fontSize={20}>Frequently asked questions</Text>
        <div style={{marginTop: '15px'}}/>
        <FAQTile/>
      </JustifyStartColumn>
    </Container>
  )
};

FAQ.defaultProps = FAQDefaultProps

export default FAQ

