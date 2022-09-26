import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import HidePassword from "../../icons/HidePassword";
import ShowPassword from "../../icons/ShowPassword";
import styled from "styled-components";

type ShowAndHidePasswordPropType = {
  passwordType: string;
  setPasswordType: (type: "text" | "password") => void;
}

const ShowAndHidePasswordDefaultProps = {}

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
`

const ShowAndHidePassword = (props: ShowAndHidePasswordPropType) => {
  const {locale} = useContext(LocaleContext)
  const {passwordType, setPasswordType} = props;

  const togglePassword = () => {
    if (passwordType === "text") {
      setPasswordType("password")
      return
    }

    setPasswordType("text")
  }

  return (
    <IconWrapper onClick={togglePassword}>
      {passwordType === "text" ? <ShowPassword/> : <HidePassword/>}
    </IconWrapper>
  )
};

ShowAndHidePassword.defaultProps = ShowAndHidePasswordDefaultProps

export default ShowAndHidePassword