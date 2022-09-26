import React, {useContext} from "react";
import texts from "./localization";
import OtpInput from "../../Standard/components/OTPInput";
import LocaleContext from "../../Standard/LocaleContext";
import Text from "../../components/Text";
import styled from "styled-components";
import {localized} from "../../Standard/utils/localized";
import ErrorMessage from "../../components/ErrorMessage";

type TwoFAPropType = {
  otpCode: string;
  setOptCode: (value: string) => void;
  serverErrorMessage: string | undefined,
  setIsWaitingForCode: (value: boolean) => void
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

  const {otpCode, setOptCode, serverErrorMessage, setIsWaitingForCode} = props

  const onChange = (value: string) => setOptCode(value);

  return (
    <Container>
      <TwoFAContainer>
        <TextWrapper>
          <Text fontWeight={600} fontSize={25}>Two-Factor Authentication - 2FA</Text>
          <Text fontWeight={400} fontSize={16} marginBottom={25}>{localized(texts.messageSend, locale)}</Text>
        </TextWrapper>
        <OtpInput value={otpCode} valueLength={4} onChange={onChange}/>
        <ReturnButton onClick={() => {
          setIsWaitingForCode(false)
          setOptCode("")
        }}>{localized(texts.cancel, locale)}</ReturnButton>
      </TwoFAContainer>
      {
        serverErrorMessage &&
        <ErrorMessage
          message={serverErrorMessage}
          title={localized(texts.error2FA, locale)}
        />
      }
    </Container>
  );
};

TwoFA.defaultProps = TwoFADefaultProps;

export default TwoFA;

