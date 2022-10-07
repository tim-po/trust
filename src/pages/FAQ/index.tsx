import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import {JustifyStartColumn} from 'Standard/styles/GlobalStyledComponents'
import Text from 'components/Text'
import FAQTile from "components/FAQTile";
import TrustButton from "Standard/components/TrustButton";
import {IQuestion} from "types/FAQ";

type FAQPropType = {}

const FAQDefaultProps = {}

const mockQuestions = [
  {
    id: 1,
    title: 'What is a venture company?',
    body: 'Venture companies are rapidly growing businesses that take investments to accelerate its growth rates. The final goal of the venture company is to make an Exit to give a liquidity for venture investors. Exits could be done via public exchange listing or by selling the entire company to another company.'
  },
  {
    id: 2,
    title: 'What are direct and non-direct deals??',
    body: 'Venture companies are rapidly growing businesses that take investments to accelerate its growth rates. The final goal of the venture company is to make an Exit to give a liquidity for venture investors. Exits could be done via public exchange listing or by selling the entire company to another company.'
  },
  {
    id: 3,
    title: "Why can't I just buy the shares directly from the shareholder??",
    body: 'Venture companies are rapidly growing businesses that take investments to accelerate its growth rates. The final goal of the venture company is to make an Exit to give a liquidity for venture investors. Exits could be done via public exchange listing or by selling the entire company to another company.'
  },
  {
    id: 4,
    title: 'Who are we buying these shares from??',
    body: 'Venture companies are rapidly growing businesses that take investments to accelerate its growth rates. The final goal of the venture company is to make an Exit to give a liquidity for venture investors. Exits could be done via public exchange listing or by selling the entire company to another company.'
  }
]

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
  z-index: 2;
`

const ZIndexWrapper = styled.div`
  z-index: 1000;
`

const ButtonWrapper = styled.div`
  width: 180px;
`

const FAQ = (props: FAQPropType) => {
  const {locale} = useContext(LocaleContext)
  const [allQuestions, setAllQuestions] = useState<IQuestion[]>(mockQuestions)

  return (
    <Container>
      <ZIndexWrapper>
        <JustifyStartColumn>
          <JustifyStartColumn gap={14}>
            <Text fontWeight={600} fontSize={45} color={'#33CC66'}>{localized(texts.title, locale)}</Text>
            <Text fontWeight={500} fontSize={20}>{localized(texts.anyQuestion, locale)}</Text>
            <Text fontWeight={400} fontSize={16}>{localized(texts.replayTime, locale)}</Text>
            <ButtonWrapper>
              <TrustButton
                isValid
                style='green'
              >
                {localized(texts.sendEmailButton, locale)}
              </TrustButton>
            </ButtonWrapper>
          </JustifyStartColumn>
          <div className='mt-10'/>
          <Text fontWeight={600} fontSize={20}>{localized(texts.askedQuestions, locale)}</Text>
          <div style={{marginTop: '15px'}}/>
          {allQuestions.map(question =>
            <div key={question.id}>
              <FAQTile title={question.title} body={question.body}/>
            </div>)
          }
        </JustifyStartColumn>
      </ZIndexWrapper>
    </Container>
  )
};

FAQ.defaultProps = FAQDefaultProps

export default FAQ

