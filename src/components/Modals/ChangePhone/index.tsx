import React from 'react';
import styled from 'styled-components';
import Text from 'Standard/components/Text'
import {JustifyStartColumn, Row} from "Standard/styles/GlobalStyledComponents";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import TrustButton from "Standard/components/TrustButton";

const ButtonWrapper = styled.div`
  width: 180px;
`

const ChangePhoneModal = () => {
  const [[phone, setPhone], phoneValid] = useValidatedState<string>("", validationFuncs.hasValue);
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
          onChangeRaw={setPhone}
          required
          isValid={phoneValid}
          errorTooltipText={'Incorrect Phone'}
          inputProps={{
            className: `w-full`,
            placeholder: `Phone number`,
            value: phone
          }}
        />
      </SimpleLabelContainer>
      <ButtonWrapper>
        <TrustButton style='green' isValid={phoneValid}>Change phone</TrustButton>
      </ButtonWrapper>
    </JustifyStartColumn>
  );
};

export default ChangePhoneModal;