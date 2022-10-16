import React, {useContext, useEffect} from "react";
import texts from "./localization";
import OtpInput from "Standard/components/OTPInput";
import LocaleContext from "Standard/LocaleContext";
import Text from "components/Text";
import styled from "styled-components";
import {localized} from "Standard/utils/localized";
import ErrorMessage from "components/ErrorMessage";
import {useHistory} from "react-router-dom";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import {useSendCode} from "hooks/useSendCode";
import {RouteName} from "router";

type TwoFAPropType = {
  setIsWaitingForCode: (value: boolean) => void,
  appUrl?: string,
  isWaitingForCode: boolean
  email: string,
  serverUrl: string
}

const TwoFADefaultProps = {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TwoFAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid rgba(24, 24, 51, 0.1);
  border-radius: 16px;
  padding: 50px 45px;
  width: 480px;
  margin-bottom: 20px;
  z-index: 1000;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ReturnButton = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #D2D5DA;
  margin-top: 23px;
  cursor: pointer;
`

const TwoFA = (props: TwoFAPropType) => {
  const {locale} = useContext(LocaleContext);

  const {setIsWaitingForCode, appUrl, isWaitingForCode, email, serverUrl} = props

  const [[code, setCode], codeValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const history = useHistory()

  const handleReturnButtonClick = () => {
    setIsWaitingForCode(false)
    setCode("")

    if (appUrl) {
      history.push(appUrl)
    }
  }

  const {fetchCode, incorrectCodeError} = useSendCode(
    {
      login: email,
      mfaCode: +code
    },
    serverUrl,
    appUrl
  )

  async function sendCode() {
    if (!codeValid) return
    fetchCode()
  }

  useEffect(() => {
    if (isWaitingForCode && code.length === 4) {
      sendCode()
    }
  }, [isWaitingForCode, code])


  return (
    <Container>
      <TwoFAContainer>
        <TextWrapper>
          <Text fontWeight={600} fontSize={25}>Two-Factor Authentication - 2FA</Text>
          <Text fontWeight={400} fontSize={16} marginBottom={25}>{localized(texts.messageSend, locale)}</Text>
        </TextWrapper>
        <OtpInput value={code} valueLength={4} onChange={setCode}/>
        <ReturnButton onClick={handleReturnButtonClick}>{localized(texts.cancel, locale)}</ReturnButton>
      </TwoFAContainer>
      {
        incorrectCodeError &&
        <ErrorMessage
          message={incorrectCodeError}
          title={localized(texts.error2FA, locale)}
        />
      }
    </Container>
  );
};

TwoFA.defaultProps = TwoFADefaultProps;

export default TwoFA;

