import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import CheckMark from "../../icons/CheckMark";
import Close from "../../icons/Close";
import Text from '../Text';

type DocumentTextRulesPropType = {}

const DocumentTextRulesDefaultProps = {}

const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 32px;
`

const FlexRuleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const IconWrapper = styled.div<{ height: number, width: number }>`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
`

const DocumentTextRules = (props: DocumentTextRulesPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <RulesContainer>
      <FlexRuleWrapper>
        <IconWrapper height={24} width={24}>
          <CheckMark color={'#33CC66'} height={20} width={20}/>
        </IconWrapper>
        <Text fontSize={12} fontWeight={500} color={'#6C6C6C'}>{localized(texts.governmentIssued, locale)}</Text>
      </FlexRuleWrapper>
      <FlexRuleWrapper>
        <IconWrapper height={24} width={24}>
          <CheckMark color={'#33CC66'} height={20} width={20}/>
        </IconWrapper>
        <Text fontSize={12} fontWeight={500} color={'#6C6C6C'}>{localized(texts.originalFullSize, locale)}</Text>
      </FlexRuleWrapper>
      <FlexRuleWrapper>
        <IconWrapper height={24} width={24}>
          <CheckMark color={'#33CC66'} height={20} width={20}/>
        </IconWrapper>
        <Text fontSize={12} fontWeight={500} color={'#6C6C6C'}>{localized(texts.background, locale)}</Text>
      </FlexRuleWrapper>
      <FlexRuleWrapper>
        <IconWrapper height={24} width={24}>
          <CheckMark color={'#33CC66'} height={20} width={20}/>
        </IconWrapper>
        <Text fontSize={12} fontWeight={500} color={'#6C6C6C'}>{localized(texts.readable, locale)}</Text>
      </FlexRuleWrapper>
      <FlexRuleWrapper>
        <IconWrapper height={24} width={24}>
          <Close/>
        </IconWrapper>
        <Text fontSize={12} fontWeight={500} color={'#6C6C6C'}>{localized(texts.noBlackAndWhite, locale)}</Text>
      </FlexRuleWrapper>
      <FlexRuleWrapper>
        <IconWrapper height={24} width={24}>
          <Close/>
        </IconWrapper>
        <Text fontSize={12} fontWeight={500} color={'#6C6C6C'}>{localized(texts.noEdited, locale)}</Text>
      </FlexRuleWrapper>
    </RulesContainer>
  )
};

DocumentTextRules.defaultProps = DocumentTextRulesDefaultProps

export default DocumentTextRules