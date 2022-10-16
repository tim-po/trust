import React from 'react';
import StepItem from "Standard/components/Stepper/StepItem";
import {AlignCenterRow, JustifyStartColumn,} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import {IDealActions, IDealStepStatus} from "types/ManageStatus";

type SignDocumentsProps = {
  status: IDealStepStatus,
  action: IDealActions
}

const DealConfirmation = (props: SignDocumentsProps) => {
  const {status, action} = props

  return (
    <StepItem status={status} isLastStep>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={20}>Wait for deal confirmation</Text>
      </JustifyStartColumn>
      <div className={'mb-4'} />
    </StepItem>
  );
};

export default DealConfirmation;