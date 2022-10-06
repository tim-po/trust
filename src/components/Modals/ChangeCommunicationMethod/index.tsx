import React, {useState} from 'react';
import { JustifyStartColumn } from 'Standard/styles/GlobalStyledComponents';
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import TrustButton from "../../../Standard/components/TrustButton";
import useValidatedState, {validationFuncs, validationFuncsFactory} from "Standard/hooks/useValidatedState";
import SimpleAutocomplete from "Standard/components/SimpleAutocomplete";
import SimpleInput from "Standard/components/SimpleInput";

const ChangeCommunicationMethodModal = () => {
  const methods = ['Telegram', 'WhatsApp', 'Email']
  const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(methods.map(method => method)));
  const [[personalData, setPersonalData], personalDataValid] = useValidatedState<string>("", validationFuncs.hasValue);

  return (
    <JustifyStartColumn>
      <div className={'mt-5'}/>
      <SimpleLabelContainer
        label={'Communication method'}
        id="shipping country-name"
      >
        <SimpleAutocomplete
          isValid={nationalityValid}
          onChangeRaw={setNationality}
          errorTooltipText={"Invalid communication method"}
          required
          placeholder={'Communication method'}
          autoComplete={"shipping country-name"}
          name={"shipping country-name"}
          id={"shipping country-name"}
          options={methods.map(method => {
            return ({value: method})
          })}
          value={nationality}
        />
      </SimpleLabelContainer>
      {nationality &&
        <SimpleLabelContainer label={'Write your phone/username/email'} id="new-password-text-field">
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
            onChangeRaw={setPersonalData}
          />
        </SimpleLabelContainer>
      }
      <TrustButton style='green' isValid={nationalityValid}>Change method</TrustButton>
    </JustifyStartColumn>
  );
};

export default ChangeCommunicationMethodModal;