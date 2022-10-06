import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {RouteName} from "../../router";
import {API_URL} from "../../api/constants";
import sha256 from "crypto-js/sha256";
import useValidatedState, {validationFuncs} from "../../Standard/hooks/useValidatedState";
import {useCookies} from "react-cookie";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../Standard/components/Spinner";
import SimpleInput from "../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../Standard/components/SimpleLabelContainer";
import LogAndRegFormWrapper from "../../components/LogAndRegFormWrapper";
import Button from '../../Standard/components/ButtonV2';
import TwoFA from "../TwoFA";

type LoginPropType = {}

const LoginDefaultProps = {};

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TextLink = styled(Link)`
  position: relative;
  color: #04C35C;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FlexLinksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
`;

const Login = (props: LoginPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);

  const [isWaitingForCode, setIsWaitingForCode] = useState<boolean>(false)
  const [[code, setCode], codeValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<any>('')
  const [incorrectCodeError, setIncorrectCodeError] = useState()

  const [cookies, setCookie] = useCookies(["auth"]);


  async function setUser() {
    if (!isValid) return;

    setIsLoading(true);

    const registrationUrl = `${API_URL}/api/auth/login`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        login: email,
        password: sha256(password).toString()
      })
    };
    return fetch(registrationUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200 || json.statusMessage === 201) {
          setIsWaitingForCode(true)
        } else {
          setIsServerError(true)
          setServerErrorMessage(json.message)
        }
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false))
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.code === "Enter" || event.code === "NumpadEnter")) {
      if (isWaitingForCode) {
        sendCode()
      } else {
        setUser()
      }
    }
  }

  async function sendCode() {

    if (!codeValid) {
      return
    }

    const TwoFAUrl = `${API_URL}/api/auth/login/code`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        login: email,
        recoveryCode: +code
      })
    };

    fetch(TwoFAUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
      if (json.statusCode === 200 || json.statusCode === 201) {
        setCookie("auth", json.token, {path: window.location.pathname});
        history.push(RouteName.VERIFICATION);
      } else {
        setIncorrectCodeError(json.message)
      }
    })
  }

  const isValid = emailValid && passwordValid;

  useEffect(() => {
    if (email && password) {
      //@ts-ignore
      document.addEventListener("keydown", handleEnterPress);

      return () => {
        //@ts-ignore
        document.removeEventListener("keydown", handleEnterPress);
      };
    }
  }, [email, password]);

  useEffect(() => {
    if (isWaitingForCode && code.length === 4) {
      sendCode()
    }
  }, [isWaitingForCode, code])

  return (
    <LoginPageContainer>
      {!isWaitingForCode && <LogAndRegFormWrapper title={localized(texts.pageTitle, locale)}>
        <SimpleLabelContainer
          label={localized(texts.emailAddressLabel, locale)}
          id={"email"}
        >
          <SimpleInput
            required
            isValid={emailValid}
            onChangeRaw={setEmail}
            errorTooltipText={`${localized(texts.incorrectEmailWarning, locale)}`}
            inputProps={{
              placeholder: `${localized(texts.emailAddressLabel, locale)}`,
              type: "email",
              className: "w-full",
              value: email
            }}
            id={"email"}
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer
          label={localized(texts.passwordLabel, locale)}
          id={"current-password"}>
          <SimpleInput
            required
            isValid={passwordValid}
            errorTooltipText={`${localized(texts.incorrectPasswordWarning, locale)}`}
            inputProps={{
              placeholder: `${localized(texts.passwordLabel, locale)}`,
              type: "password",
              className: "w-full",
              value: password
            }}
            id={"current-password"}
            autoComplete={"current-password"}
            onChangeRaw={setPassword}
          />
        </SimpleLabelContainer>
        {
          isServerError &&
          <ErrorMessage
            message={serverErrorMessage}
            title={localized(texts.errorSignIn, locale)}
          />
        }
        <Button
          isValid={isValid}
          onClick={setUser}
        >
          {
            isLoading ?
              <Spinner color="white" size={25}/>
              :
              `${localized(texts.buttonText, locale)}`
          }
        </Button>
        <FlexLinksWrapper>
          <TextLink to={RouteName.REGISTRATION}>{localized(texts.signUp, locale)}</TextLink>
        </FlexLinksWrapper>
      </LogAndRegFormWrapper>}
      {isWaitingForCode && <TwoFA otpCode={code} setOptCode={setCode} serverErrorMessage={incorrectCodeError} setIsWaitingForCode={setIsWaitingForCode}/>}
    </LoginPageContainer>
  );
};

Login.defaultProps = LoginDefaultProps;

export default Login;

