import React, {useState} from 'react';
import { JustifyStartColumn } from 'Standard/styles/GlobalStyledComponents';
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import TrustButton from "../../../Standard/components/TrustButton";
import useValidatedState, {validationFuncs, validationFuncsFactory} from "Standard/hooks/useValidatedState";
import SimpleAutocomplete from "Standard/components/SimpleAutocomplete";
import SimpleInput from "Standard/components/SimpleInput";
import styled from "styled-components";

const UserContactsWrapper = styled.div`
  animation: appear 0.2s ease-out;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const ButtonWrapper = styled.div`
  width: 180px;
`

const ChangeCommunicationMethodModal = () => {
  const methods = ['Telegram', 'WhatsApp', 'Email']
  const [[communicationMethods, setCommunicationMethods], communicationMethodsValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(methods.map(method => method)));
  const [[personalContact, setPersonalContact], personalDataValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const isValid = communicationMethodsValid && personalDataValid

  return (
    <JustifyStartColumn>
      <div className={'mt-5'}/>
      <SimpleLabelContainer
        label={'Communication method'}
        id="shipping country-name"
      >
        <SimpleAutocomplete
          isValid={communicationMethodsValid}
          onChangeRaw={setCommunicationMethods}
          errorTooltipText={"Invalid communication method"}
          required
          placeholder={'Communication method'}
          autoComplete={"shipping country-name"}
          name={"shipping country-name"}
          id={"shipping country-name"}
          options={methods.map(method => {
            return ({value: method})
          })}
          value={communicationMethods}
        />
      </SimpleLabelContainer>
      {communicationMethods && communicationMethodsValid &&
       <UserContactsWrapper>
         <SimpleLabelContainer label={`Write your ${communicationMethods} contacts`} id="new-password-text-field">
           <SimpleInput
             hasIcon
             required
             isValid={personalDataValid}
             inputProps={{
               placeholder: `Password`,
               type: 'text',
               name: "new-password",
               className: "w-full"
             }}
             autoComplete={"new-password"}
             id="new-password-text-field"
             onChangeRaw={setPersonalContact}
           />
         </SimpleLabelContainer>
       </UserContactsWrapper>
      }
      <ButtonWrapper>
        <TrustButton style='green' isValid={isValid}>Change method</TrustButton>
      </ButtonWrapper>
    </JustifyStartColumn>
  );
};

export default ChangeCommunicationMethodModal;