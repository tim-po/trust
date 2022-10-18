import React from 'react';
import StepItem from "Standard/components/Stepper/StepItem";
import {JustifyStartColumn,} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import {IDealActions, IDealStepStatus, StepStatusEnum, ActionStatusEnum} from "types/ManageStatus";
import TrustButton from "Standard/components/TrustButton";
import styled from "styled-components";

type SignDocumentsProps = {
  status: IDealStepStatus,
  action: IDealActions,
  nextStep: (body: { desiredInvestmentAmount?: number }) => void,
  adminErrorMessage?: string
}

const ButtonWrapper = styled.div`
  width: 180px;
`

const SignDocuments = (props: SignDocumentsProps) => {
  const {status, action, adminErrorMessage, nextStep} = props

  return (
    <StepItem status={status}>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={20}>Sign necessary documents</Text>
        <div className={'mb-2'}/>
        {status === StepStatusEnum.ACTIVE &&
          <>
            {(action === ActionStatusEnum.USER_ACTION || action === ActionStatusEnum.USER_ACTION_UNSUCCESSFUL) &&
              <>
                <JustifyStartColumn gap={10}>
                  {adminErrorMessage && <Text fontWeight={400} fontSize={14} color={'#e73d3d'}><strong>Message from manager:</strong> {adminErrorMessage}</Text>}
                  <ButtonWrapper>
                    <TrustButton style='green' isValid onClick={() => nextStep({})}>Get documents</TrustButton>
                  </ButtonWrapper>
                </JustifyStartColumn>
              </>
            }
            {action === ActionStatusEnum.ADMIN_ACTION &&
              <Text fontWeight={400} fontSize={14}>We sent the documents to your email after signing the manager will check them.</Text>
            }
          </>
        }
      </JustifyStartColumn>
      <div className={'mb-4'}/>
    </StepItem>
  );
};

export default SignDocuments;