import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import {JustifyStartColumn, RowCentered, StartRow} from 'Standard/styles/GlobalStyledComponents'
import Text from 'components/Text'
import FAQTile from "components/FAQTile";
import TrustButton from "Standard/components/TrustButton";
import {IQuestion} from "types/FAQ";
import {API_URL} from "api/constants";

type FAQPropType = {}

const FAQDefaultProps = {}

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

const Wrapper = styled(StartRow)`
  width: 900px;
`

const FAQ = (props: FAQPropType) => {
  const {locale} = useContext(LocaleContext)
  const [allQuestions, setAllQuestions] = useState<IQuestion[]>([])

  const getQuestions = async () => {
    const faqUrl = `${API_URL}/api/faq`

    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }

    fetch(faqUrl, requestOptions)
      .then(res => res.json())
      .then(json => setAllQuestions(json.faq))
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <Container>
      <ZIndexWrapper>
        <JustifyStartColumn>
          <RowCentered>
            <Wrapper>
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
                <div className='mt-10'/>
                <Text fontWeight={600} fontSize={20}>{localized(texts.askedQuestions, locale)}</Text>
                <div style={{marginTop: '15px'}}/>
              </JustifyStartColumn>
            </Wrapper>
          </RowCentered>
          <RowCentered>
            {allQuestions.length ?
              allQuestions.map(question =>
              <div key={question.id}>
                <FAQTile title={question.title} body={question.body}/>
              </div>)
              :
              ''
            }
          </RowCentered>
        </JustifyStartColumn>
      </ZIndexWrapper>
    </Container>
  )
};

FAQ.defaultProps = FAQDefaultProps

export default FAQ

