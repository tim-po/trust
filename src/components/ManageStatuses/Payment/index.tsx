import React, {useEffect} from 'react';
import {JustifyStartColumn, AlignCenterRow} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import StepItem from "Standard/components/Stepper/StepItem";
import SimpleInput from "Standard/components/SimpleInput";
import TrustButton from "Standard/components/TrustButton";
import styled from "styled-components";
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import {API_URL} from "api/constants";
import {useHistory} from "react-router-dom";
import {RouteName} from "router";
import {IDealStepStatus, IDealActions, StepStatusEnum, ActionStatusEnum} from "types/ManageStatus";

type PaymentStatusProps = {
  status: IDealStepStatus,
  action: IDealActions
}

const ButtonWrapper = styled.div`
  width: 180px;
  margin-bottom: 20px;
`

const NoContactsLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  transition: opacity .4s;
  
  &:hover {
    opacity: 0.3;
  }
`

const PaymentStatus = (props: PaymentStatusProps) => {
  const {status, action} = props

  const [[amount, setAmount], amountValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[contact, setContact], contactValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const {fetchUserAccountInfo, communicationMethod} = useUserAccountInfo(`${API_URL}/api/users/contacts`)

  const history = useHistory()

  useEffect(() => {
    fetchUserAccountInfo()
  } ,[])

  return (
    <StepItem status={status}>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={20}>Configure initial deal</Text>
        <div className={'mb-2'}/>
        {status === StepStatusEnum.ACTIVE &&
          <>
            {action === ActionStatusEnum.USER_ACTION &&
              <>
                <Text fontWeight={400} fontSize={14}>To get started, enter the desired purchase amount and select a
                  communication method. After sending the data, the manager will contact you to confirm the information.
                </Text>
                <div className={'mb-2'}/>
                <AlignCenterRow>
                  <SimpleLabelContainer label={'Amount in $'}>
                    <SimpleInput
                      onlyEmmitOnBlur
                      required
                      isValid={amountValid}
                      onChangeRaw={setAmount}
                      errorTooltipText={`Field is required`}
                      inputProps={{
                        className: `w-full`,
                        placeholder: `Amount `,
                        value: amount
                      }}
                    />
                  </SimpleLabelContainer>
                </AlignCenterRow>
                <ButtonWrapper>
                  <TrustButton style='green' isValid={amountValid}>Send data</TrustButton>
                </ButtonWrapper>
                {communicationMethod ?
                  <Text fontWeight={400} fontSize={14}>Your contacts: {communicationMethod.contact}</Text>
                  :
                  <NoContactsLink onClick={() => history.push(RouteName.CHANGE_COMMUNICATION_METHOD)}>
                    <Text fontWeight={400} fontSize={14}>You didn't provide contacts. Follow the link and edit</Text>
                  </NoContactsLink>
                }
              </>
            }
            {action === ActionStatusEnum.ADMIN_ACTION &&
              <Text fontWeight={400} fontSize={14}>You have successfully submitted your application.<br /> Wait for a response from the manager.</Text>
            }
            {action === ActionStatusEnum.USER_ACTION_UNSUCCESSFUL &&
              <></>
            }
          </>
        }
      </JustifyStartColumn>
      <div className={'mb-4'} />
    </StepItem>
  );
};

export default PaymentStatus;