import React, {useContext} from 'react';
import texts from './localized';
import LocaleContext from 'Standard/LocaleContext';
import {localized} from 'Standard/utils/localized';
import Text from 'components/Text'
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {RouteName} from "router";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(24, 24, 51, .1);
  border-radius: 20px;
  min-width: 90px;
  height: 40px;
  width: max-content;
  padding: 0 12px;
  cursor: pointer;
`

const FAQButton = () => {
  const {locale} = useContext(LocaleContext);
  const history = useHistory()

  const historyPush = () => {
    history.push(RouteName.FAQ)
  }

  return (
    <IconWrapper onClick={historyPush}>
      <Text fontWeight={500} fontSize={16}>{localized(texts.FAQ, locale)}</Text>
    </IconWrapper>
  );
};

export default FAQButton;