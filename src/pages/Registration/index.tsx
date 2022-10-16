import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {RouteName} from "router";
import sha256 from "crypto-js/sha256";
import {API_URL} from "api/constants";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "Standard/components/Spinner";
import SimpleInput from "Standard/components/SimpleInput";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import LogAndRegFormWrapper from "components/LogAndRegFormWrapper";
import ShowAndHidePassword from "components/ShowAndHidePassword";
import TwoFA from "../TwoFA";
import TrustButton from "Standard/components/TrustButton";
import {AnimatedWrapper} from "styles/StyledComponents";
import usePrevious from "Standard/hooks/usePrevious";

type RegistrationPropType = {}

const RegistrationDefaultProps = {};

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media screen and (max-width: 900px) {
    padding-bottom: 20px;
  }
`;

const GrayText = styled.div`
  color: #8D929C;
  font-weight: 700;
  font-size: 14px;
  margin-right: 5px;
`;

const TextLink = styled(Link)`
  color: #04C35C;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FlexLinksWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

const Registration = (props: RegistrationPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[repeatedPassword, setRepeatPassword], repeatedPasswordValid] = useValidatedState<string>("", newValue => newValue === password);

  const [isWaitingForCode, setIsWaitingForCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const [passwordType, setPasswordType] = useState<"text" | "password">("password")
  const [repeatPasswordType, setRepeatPasswordType] = useState<"text" | "password">("password")

  const [isServerError, setIsServerError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const prevEmailRef = usePrevious(email)
  const prevPasswordRef = usePrevious(password)

  const isValid = emailValid && repeatedPasswordValid && passwordValid;

  async function setNewUser() {
    if (!isValid) return;

    setIsLoading(true);

    const registrationUrl = `${API_URL}/api/auth/registration`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        login: email,
        password1: sha256(password).toString(),
        password2: sha256(repeatedPassword).toString()
      })
    };

    return fetch(registrationUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200 || json.statusMessage === 201) {
          setIsWaitingForCode(true)
        } else {
          setIsServerError(true)
          setErrorMessage(json.message)
        }
      })
      .catch(e => {})
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (isServerError && (prevEmailRef !== email || prevPasswordRef !== password)) {
      setIsServerError(false)
    }
  }, [isServerError, email, password])

  return (
    <LoginPageContainer>
      {!isWaitingForCode && <LogAndRegFormWrapper title={localized(texts.pageTitle, locale)}>
        <SimpleLabelContainer label={localized(texts.emailAddressLabel, locale)} id={"email"}>
          <SimpleInput
            required
            isValid={emailValid}
            onChangeRaw={setEmail}
            errorTooltipText={`${localized(texts.incorrectEmailWarning, locale)}`}
            inputProps={{
              placeholder: `${localized(texts.emailAddressLabel, locale)}`,
              type: "email",
              className: "w-full"
            }}
            id={"email"}
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={localized(texts.passwordLabel, locale)} id="new-password-text-field">
          <SimpleInput
            hasIcon
            Icon={<ShowAndHidePassword passwordType={passwordType} setPasswordType={setPasswordType}/>}
            required
            isValid={passwordValid}
            errorTooltipText={`${localized(texts.incorrectPasswordWarning, locale)}`}
            inputProps={{
              placeholder: `${localized(texts.passwordLabel, locale)}`,
              type: `${passwordType}`,
              name: "new-password",
              className: "w-full"
            }}
            autoComplete={"new-password"}
            id="new-password-text-field"
            onChangeRaw={setPassword}
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={localized(texts.confirmPasswordLabel, locale)} id="confirm-password-text-field">
          <SimpleInput
            hasIcon
            Icon={<ShowAndHidePassword passwordType={repeatPasswordType} setPasswordType={setRepeatPasswordType}/>}
            required
            isValid={repeatedPasswordValid}
            id="confirm-password-text-field"
            errorTooltipText={`${localized(texts.passwordsNotMatchWarning, locale)}`}
            inputProps={{
              placeholder: `${localized(texts.confirmPasswordLabel, locale)}`,
              type: `${repeatPasswordType}`,
              name: "new-password",
              className: "w-full"
            }}
            autoComplete={"new-password"}
            onChangeRaw={setRepeatPassword}
          />
        </SimpleLabelContainer>
        <AnimatedWrapper isActive={isServerError}>
          {
            isServerError &&
            <ErrorMessage message={errorMessage} title={'Registration error'}/>
          }
        </AnimatedWrapper>
        <TrustButton
          style='green'
          isValid={isValid}
          onClick={setNewUser}
        >
          {
            isLoading ?
              <Spinner color="white" size={25}/>
              :
              `${localized(texts.buttonText, locale)}`
          }
        </TrustButton>
        <FlexLinksWrapper>
          <GrayText>{localized(texts.alreadyRegistered, locale)}</GrayText>
          <TextLink to={RouteName.LOGIN}>{localized(texts.signIn, locale)}</TextLink>
        </FlexLinksWrapper>
      </LogAndRegFormWrapper>}
      {
        isWaitingForCode &&
        <TwoFA
          email={email}
          setIsWaitingForCode={setIsWaitingForCode}
          isWaitingForCode={isWaitingForCode}
          serverUrl={`${API_URL}/api/auth/registration/code`}
          appUrl={RouteName.VERIFICATION}
        />
      }
    </LoginPageContainer>
  );
};

Registration.defaultProps = RegistrationDefaultProps;

export default Registration;

