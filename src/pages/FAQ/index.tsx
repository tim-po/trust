import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import {JustifyStartColumn, ButtonV3} from 'Standard/styles/GlobalStyledComponents'
import Text from 'components/Text'
import FAQTile from "components/FAQTile";
import GradientCircles from "Standard/decorations/GradientCircles";

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
          <Text fontWeight={600} fontSize={45} color={'#33CC66'}>{localized(texts.title, locale)}</Text>
          <Text fontWeight={500} fontSize={20}>{localized(texts.anyQuestion, locale)}</Text>
          <Text fontWeight={400} fontSize={16}>{localized(texts.replayTime, locale)}</Text>
          <ButtonV3 buttonStyle='green'>{localized(texts.sendEmailButton, locale)}</ButtonV3>
        </JustifyStartColumn>
        <div className='mt-10'/>
        <Text fontWeight={600} fontSize={20}>{localized(texts.askedQuestions, locale)}</Text>
        <div style={{marginTop: '15px'}}/>
        <FAQTile/>
      </JustifyStartColumn>
      <GradientCircles/>
    </Container>
  )
};

FAQ.defaultProps = FAQDefaultProps

export default FAQ

