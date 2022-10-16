import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import {StartRow, Row, AlignCenterRow} from "Standard/styles/GlobalStyledComponents";
import {Link, useHistory} from "react-router-dom";
import ToggleDropdownButton from "icons/ToggleDropdownButton";
import {StyledLink} from "styles/StyledComponents";

type ReturnPanelPropType = {
  appUrl: string,
  title: string
}

const ReturnPanelDefaultProps = {
  appUrl: '/account',
  title: 'Account'
}

const Container = styled(StartRow)`
  width: 100%;
`

const IconWrapper = styled.div`
  transform: rotate(90deg);
`

const ReturnPanel = (props: ReturnPanelPropType) => {
  const {locale} = useContext(LocaleContext)
  const {appUrl, title} = props

  const history = useHistory()

  return (
    <Container>
      <AlignCenterRow gap={10}>
        <IconWrapper>
          <ToggleDropdownButton/>
        </IconWrapper>
        <StyledLink onClick={() => history.push(appUrl)}>{title}</StyledLink>
      </AlignCenterRow>
    </Container>
  )
};

ReturnPanel.defaultProps = ReturnPanelDefaultProps

export default ReturnPanel