import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import AccountVerificationBackground from '../../icons/AccountVerificationBackground';
import Text from '../Text';
import './index.css'
import styled from "styled-components";

type SubHeaderPropType = {}

const SubHeaderDefaultProps = {}

const FlexWrapper = styled.div`
  min-height: 225px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 90px;
  overflow: hidden;
  width: 100vw;
`

const TextFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  z-index: 1000;

  @media screen and (max-width: 900px) {
    text-align: center;
    font-size: 14px;
  }
`

const BackgroundImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 0;
`

const SubTitleWrapper = styled.div`
  @media screen and (max-width: 900px) {
    text-align: center;
  }
`

const SubHeader = (props: SubHeaderPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <FlexWrapper>
      <BackgroundImage>
        <AccountVerificationBackground/>
      </BackgroundImage>
      <TextFlexWrapper>
        <Text fontWeight={700} fontSize={45} color={'#33CC66'} adaptiveFontWeight={34}>{localized(texts.account, locale)}</Text>
        <Text fontWeight={700} fontSize={45} color={'#181833'} adaptiveFontWeight={34}>{localized(texts.verification, locale)}</Text>
      </TextFlexWrapper>
      <SubTitleWrapper>
        <Text fontWeight={400} fontSize={24} color={'#181833'} adaptiveFontWeight={18}>{localized(texts.verifyAccount, locale)}</Text>
      </SubTitleWrapper>
    </FlexWrapper>
  )
};

SubHeader.defaultProps = SubHeaderDefaultProps

export default SubHeader