import React from 'react';
import styled from 'styled-components';
import Text from 'Standard/components/Text'
import {JustifyStartColumn, Row} from "Standard/styles/GlobalStyledComponents";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import TrustButton from "Standard/components/TrustButton";

const ChangePhoneModal = () => {
  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  return (
    <JustifyStartColumn>
      <div className='mt-5' />
      <Row gap={10}>
        <Text fontWeight={500} fontSize={16}>Current:</Text>
        <Text fontWeight={400} fontSize={16} color={'rgba(24, 24, 51, 0.7)'}>88005553535</Text>
      </Row>
      <div className='mb-5' />
      <SimpleLabelContainer
        label={'New phone number'}
      >
        <SimpleInput
          onlyEmmitOnBlur
          onChangeRaw={setEmail}
          required
          isValid={emailValid}
          errorTooltipText={'Incorrect Phone'}
          inputProps={{
            className: `w-full`,
            placeholder: `Phone number`,
            value: email
          }}
        />
      </SimpleLabelContainer>
      <TrustButton style='green' isValid={emailValid}>Change phone</TrustButton>
    </JustifyStartColumn>
  );
};

export default ChangePhoneModal;