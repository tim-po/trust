import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {RouteName} from "router";
import {API_URL} from "api/constants";
import sha256 from "crypto-js/sha256";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import ErrorMessage from "components/ErrorMessage";
import Spinner from "Standard/components/Spinner";
import SimpleInput from "Standard/components/SimpleInput";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import LogAndRegFormWrapper from "components/LogAndRegFormWrapper";
import TwoFA from "../TwoFA";
import TrustButton from "Standard/components/TrustButton";
import {AnimatedWrapper} from "styles/StyledComponents";
import {usePrevious} from 'Standard/hooks/usePrevious';

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

const ForgotPasswordLink = styled(Link)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #5984D9;
  margin-bottom: 25px;

  &:focus,
  &:active {
    outline: none
  }

  &:hover {
    color: rgba(87, 144, 255, .8)
`

const Login = () => {
  const {locale} = useContext(LocaleContext);

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);

  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForCode, setIsWaitingForCode] = useState<boolean>(false)

  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<any>('')

  const prevEmailRef = usePrevious(email)
  const prevPasswordRef = usePrevious(password)

  const isValid = emailValid && passwordValid;

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
        setUser()
    }
  }

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
    if (isServerError && (prevEmailRef !== email || prevPasswordRef !== password)) {
      setIsServerError(false)
    }
  }, [isServerError, email, password])

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
        <ForgotPasswordLink to={RouteName.FORGOT_PASSWORD}>Forgot password?</ForgotPasswordLink>
        <AnimatedWrapper isActive={isServerError}>
          {
            isServerError &&
            <ErrorMessage
              message={serverErrorMessage}
              title={localized(texts.errorSignIn, locale)}
            />
          }
        </AnimatedWrapper>
        <TrustButton
          style='green'
          isValid={isValid}
          onClick={setUser}
        >
          {
            isLoading ?
              <Spinner color="white" size={25}/>
              :
              `${localized(texts.buttonText, locale)}`
          }
        </TrustButton>
        <FlexLinksWrapper>
          <TextLink to={RouteName.REGISTRATION}>{localized(texts.signUp, locale)}</TextLink>
        </FlexLinksWrapper>
      </LogAndRegFormWrapper>
      }
      {
        isWaitingForCode &&
        <TwoFA
          email={email}
          setIsWaitingForCode={setIsWaitingForCode}
          isWaitingForCode={isWaitingForCode}
          serverUrl={`${API_URL}/api/auth/login/code`}
          appUrl={RouteName.VERIFICATION}
        />
      }
    </LoginPageContainer>
  );
};


export default Login;

