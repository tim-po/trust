import React from "react";

export enum StepStatusEnum {
  ACTIVE = 'ACTIVE',
  READY = 'READY',
  WAIT = 'WAIT',
}

export enum ActionStatusEnum {
  USER_ACTION = 'USER_ACTION',
  ADMIN_ACTION = 'ADMIN_ACTION',
  USER_ACTION_UNSUCCESSFUL = 'USER_ACTION_UNSUCCESSFUL',
}

export type IDealStepStatus = keyof typeof StepStatusEnum

export type IDealActions = keyof typeof ActionStatusEnum

export enum StepsStages {
  INITIAL = 'initial',
  DOCUMENTS = 'documents',
  KYC = 'kyc',
  DEPOSIT = 'deposit',
  CONFIRMED = 'confirmed',
}

export type Step = {
  stage: StepsStages,
  component: (status: IDealStepStatus, action: IDealActions) => React.ReactNode,
}

