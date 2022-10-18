import React, {useContext, useState} from "react";
import LocaleContext from "Standard/LocaleContext";
import './index.css'
import styled from "styled-components";
import Stepper from "Standard/components/Stepper";
import PaymentStatus from "../ManageStatuses/Payment";
import SignDocuments from "../ManageStatuses/SignDocuments";
import ConfirmKYC from "../ManageStatuses/ConfirmKYC";
import DepositFunds from "../ManageStatuses/DepositFunds";
import DealConfirmation from "../ManageStatuses/DealConfirmation";
import {JustifyStartColumn} from "Standard/styles/GlobalStyledComponents";
import {
  IDealStepStatus,
  StepsStages,
  Step,
  IDealActions,
  StepStatusEnum,
  ActionStatusEnum,
  IDeal
} from "types/ManageStatus";
import Text from "Standard/components/Text";


type DealControllingPropType = {
  currentDeal: IDeal | undefined,
  nextStep: (body: { desiredInvestmentAmount?: number }) => void
}

const DealControllingDefaultProps = {}

const DealControllingWrapper = styled.div`
  width: 650px;
  height: max-content;
  background: #fff;
  box-shadow: 0 0 27px rgba(94, 103, 120, 0.1);
  border-radius: 16px;
  padding: 32px 18px;
`

const DealControlling = (props: DealControllingPropType) => {
  const {locale} = useContext(LocaleContext)
  const {currentDeal, nextStep} = props

  const StepsArray: Step[] = [
    {
      stage: StepsStages.INITIAL,
      component: (status: IDealStepStatus, action: IDealActions, adminErrorMessage?: string) =>
        <PaymentStatus
          adminErrorMessage={adminErrorMessage}
          nextStep={nextStep}
          status={status}
          action={action}
        />
    },
    {
      stage: StepsStages.KYC,
      component: (status: IDealStepStatus, action: IDealActions) =>
        <ConfirmKYC
          nextStep={nextStep}
          status={status}
          action={action}
        />
    },
    {
      stage: StepsStages.DOCUMENTS,
      component: (status: IDealStepStatus, action: IDealActions, adminErrorMessage?: string) =>
        <SignDocuments
          adminErrorMessage={adminErrorMessage}
          nextStep={nextStep}
          status={status}
          action={action}
        />
    },
    {
      stage: StepsStages.DEPOSIT,
      component: (status: IDealStepStatus, action: IDealActions, adminErrorMessage?: string) =>
        <DepositFunds
          adminErrorMessage={adminErrorMessage}
          nextStep={nextStep}
          status={status}
          action={action}
        />
    },
    {
      stage: StepsStages.CLOSED,
      component: (status: IDealStepStatus, action: IDealActions) =>
        <DealConfirmation
          status={status}
          action={action}
        />,
    },
  ]

  return (
    <DealControllingWrapper>
      {currentDeal && currentDeal.stage === StepsStages.CLOSED ?
        <JustifyStartColumn>
          <Text fontWeight={500} fontSize={20}>Deal confirmed!</Text>
          <Text fontWeight={400} fontSize={16}>Invested: ${currentDeal?.fundsDeposited}</Text>
        </JustifyStartColumn>
        :
        <Stepper>
          {currentDeal && StepsArray.map((step, index) => {
            const currentStatusIndex = StepsArray.findIndex(step => step.stage === currentDeal.stage)
            let status: IDealStepStatus
            if (index < currentStatusIndex) {
              status = StepStatusEnum.READY
            } else if (index > currentStatusIndex) {
              status = StepStatusEnum.WAIT
            } else {
              status = StepStatusEnum.ACTIVE
            }
            return <div key={step.stage}>{step.component(status, currentDeal.status, currentDeal?.adminErrorMessage)}</div>
          })}
        </Stepper>
      }
    </DealControllingWrapper>
  )
};

DealControlling.defaultProps = DealControllingDefaultProps

export default DealControlling