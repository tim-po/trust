import React, {useState} from 'react';
import { JustifyStartColumn } from 'Standard/styles/GlobalStyledComponents';
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleInput from "../../../Standard/components/SimpleInput";
import ShowAndHidePassword from "../../ShowAndHidePassword";
import TrustButton from "../../../Standard/components/TrustButton";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  width: 180px;
`

const DeleteAccountModal = () => {
  const [[password, setPassword], currentPasswordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [passwordType, setPasswordType] = useState<"text" | "password">("password")
  return (
    <JustifyStartColumn>
      <div className={'mt-5'}/>
      <SimpleLabelContainer label={'Password'} id="confirm-password-text-field">
        <SimpleInput
          hasIcon
          Icon={<ShowAndHidePassword passwordType={passwordType} setPasswordType={setPasswordType}/>}
          required
          isValid={currentPasswordValid}
          id="confirm-password-text-field"
          errorTooltipText={`Password should be longer than 8 characters`}
          inputProps={{
            placeholder: `Password`,
            type: `${passwordType}`,
            name: "new-password",
            className: "w-full"
          }}
          autoComplete={"new-password"}
          onChangeRaw={setPassword}
        />
      </SimpleLabelContainer>
      <ButtonWrapper>
        <TrustButton style='red' isValid={currentPasswordValid}>Delete account</TrustButton>
      </ButtonWrapper>
    </JustifyStartColumn>
  );
};

export default DeleteAccountModal;