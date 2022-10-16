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
import {IDealStepStatus, StepsStages, Step, IDealActions, StepStatusEnum, ActionStatusEnum} from "types/ManageStatus";

type DealControllingPropType = {}

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

  const [currentDealStep, setCurrentDealStep] = useState(undefined)

  const StepsArray: Step[] = [
    {
      stage: StepsStages.INITIAL,
      component: (status: IDealStepStatus, action: IDealActions) => <PaymentStatus status={status} action={action}/>
    },
    {
      stage: StepsStages.DOCUMENTS,
      component: (status: IDealStepStatus, action: IDealActions) => <SignDocuments status={status} action={action}/>
    },
    {
      stage: StepsStages.KYC,
      component: (status: IDealStepStatus, action: IDealActions) => <ConfirmKYC status={status} action={action}/>
    },
    {
      stage: StepsStages.DEPOSIT,
      component: (status: IDealStepStatus, action: IDealActions) => <DepositFunds status={status} action={action}/>
    },
    {
      stage: StepsStages.CONFIRMED,
      component: (status: IDealStepStatus, action: IDealActions) => <DealConfirmation status={status} action={action}/>,
    },
  ]

  return (
    <DealControllingWrapper>
      <Stepper>
        {StepsArray.map((step, index) => {
          const currentStatusIndex = StepsArray.findIndex(step => step.stage === 'initial')
          let status: IDealStepStatus
          if (index < currentStatusIndex) {
            status = StepStatusEnum.READY
          } else if (index > currentStatusIndex) {
            status = StepStatusEnum.WAIT
          } else {
            status = StepStatusEnum.ACTIVE
          }
          return <>{step.component(StepStatusEnum.ACTIVE, ActionStatusEnum.ADMIN_ACTION)}</>
        })}
      </Stepper>
    </DealControllingWrapper>
  )
};

DealControlling.defaultProps = DealControllingDefaultProps

export default DealControlling