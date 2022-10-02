import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import Logo from '../../Standard/icons/MMPROLogo';
import Text from "../Text";

type LogAndRegFormWrapperPropType = {
  children: React.ReactNode,
  title: string;
}

const LogAndRegFormWrapperDefaultProps = {}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 480px;
  padding: 24px 32px;
  border: 1px solid rgba(24, 24, 51, 0.1);
  border-radius: 16px;
  background: #fff;
  z-index: 1000;
  
  @media screen and (max-width: 900px) {
    width: 80%;
    padding: 12px 16px;
  }
`

const LogoWrapper = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(24, 24, 51, 0.1);
  margin-bottom: 24px;

  @media screen and (max-width: 900px) {
    margin-bottom: 12px;
    padding-bottom: 10px;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-bottom: 24px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`

const LogAndRegFormWrapper = (props: LogAndRegFormWrapperPropType) => {
  const {locale} = useContext(LocaleContext)
  const {children, title} = props;

  return (
    <FormWrapper>
      <LogoWrapper>
        <Logo/>
      </LogoWrapper>
      <TextWrapper>
        <Text fontWeight={400} fontSize={16}>{localized(texts.welcome, locale)}</Text>
        <Text fontWeight={600} fontSize={25}>{title}</Text>
      </TextWrapper>
      {children}
    </FormWrapper>
  )
};

LogAndRegFormWrapper.defaultProps = LogAndRegFormWrapperDefaultProps

export default LogAndRegFormWrapper