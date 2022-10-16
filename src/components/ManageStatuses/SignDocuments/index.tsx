import React from 'react';
import StepItem from "Standard/components/Stepper/StepItem";
import {AlignCenterRow, JustifyStartColumn,} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import Documents from "icons/Documents";
import {IDealActions, IDealStepStatus, StepStatusEnum, ActionStatusEnum} from "types/ManageStatus";
import TrustButton from "Standard/components/TrustButton";

type SignDocumentsProps = {
  status: IDealStepStatus,
  action: IDealActions
}

const SignDocuments = (props: SignDocumentsProps) => {
  const {status, action} = props

  return (
    <StepItem status={status}>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={20}>Sign necessary documents</Text>
        <div className={'mb-2'}/>
        {status === StepStatusEnum.ACTIVE &&
          <>
            {action === ActionStatusEnum.USER_ACTION &&
              <>
                <JustifyStartColumn gap={10}>
                  <AlignCenterRow gap={10}>
                    <Documents/>
                    <Text fontWeight={400} fontSize={16}>Doc1</Text>
                  </AlignCenterRow>
                  <AlignCenterRow gap={10}>
                    <Documents/>
                    <Text fontWeight={400} fontSize={16}>Doc1</Text>
                  </AlignCenterRow>
                </JustifyStartColumn>
              </>
            }
            {action === ActionStatusEnum.ADMIN_ACTION &&
              <Text fontWeight={400} fontSize={14}>Manager will check your documents soon.</Text>
            }
            {action === ActionStatusEnum.USER_ACTION_UNSUCCESSFUL &&
              <></>
            }
          </>
        }
      </JustifyStartColumn>
      <div className={'mb-4'}/>
    </StepItem>
  );
};

export default SignDocuments;