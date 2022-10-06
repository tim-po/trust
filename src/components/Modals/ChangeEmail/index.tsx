import React from 'react';
import styled from 'styled-components';
import Text from 'Standard/components/Text'
import {JustifyStartColumn} from "Standard/styles/GlobalStyledComponents";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import TrustButton from "Standard/components/TrustButton";

const ChangeEmailModal = () => {
  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  return (
    <JustifyStartColumn>
      <div className='mt-5' />
     <JustifyStartColumn gap={10}>
       <Text fontWeight={500} fontSize={16}>Current:</Text>
       <Text fontWeight={400} fontSize={16} color={'rgba(24, 24, 51, 0.7)'}>sobaka@gmail.com</Text>
     </JustifyStartColumn>
      <div className='mb-5' />
      <SimpleLabelContainer
        label={'New Email'}
      >
        <SimpleInput
          onlyEmmitOnBlur
          onChangeRaw={setEmail}
          required
          isValid={emailValid}
          errorTooltipText={'Incorrect Email'}
          inputProps={{
            className: `w-full`,
            placeholder: `Email`,
            value: email
          }}
        />
      </SimpleLabelContainer>
      <TrustButton style='green' isValid={emailValid}>Change Email</TrustButton>
    </JustifyStartColumn>
  );
};

export default ChangeEmailModal;