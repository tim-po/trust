import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import Text from '../Text';
import './index.css'
import styled from "styled-components";

type SubHeaderPropType = {
  backgroundIcon: React.ReactNode,
  greenTitle: string,
  blackTitle?: string,
  subtitle?: string
}

const SubHeaderDefaultProps = {}

const FlexWrapper = styled.div`
  z-index: 2;
  min-height: 140px;
  height: max-content;
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
  const {backgroundIcon, greenTitle, blackTitle, subtitle} = props
  return (
    <FlexWrapper>
      <BackgroundImage>
        {backgroundIcon}
      </BackgroundImage>
      <TextFlexWrapper>
        <Text fontWeight={700} fontSize={45} color={'#33CC66'} adaptiveFontWeight={34}>{greenTitle}</Text>
        <Text fontWeight={700} fontSize={45} color={'#181833'} adaptiveFontWeight={34}>{blackTitle}</Text>
      </TextFlexWrapper>
      <SubTitleWrapper>
        <Text fontWeight={400} fontSize={24} color={'#181833'} adaptiveFontWeight={18}>{subtitle}</Text>
      </SubTitleWrapper>
    </FlexWrapper>
  )
};

SubHeader.defaultProps = SubHeaderDefaultProps

export default SubHeader