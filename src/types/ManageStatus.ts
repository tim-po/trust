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
  CLOSED = 'closed',
}

export type Step = {
  stage: StepsStages,
  component: (status: IDealStepStatus, action: IDealActions, adminErrorMessage?: string) => React.ReactNode,
}

export const StageToTitleMapping: {[key: string]: string} = {
  'initial': 'Configure initial deal',
  'kyc': 'Confirm KYC',
  'documents': 'Sign necessary documents',
  'deposit': 'Deposit Funds',
  'closed': 'Closed'
}

export type IDeal =  {
  adminErrorMessage: string;
  desiredInvestmentAmount: number;
  investment: {aboutSubtitle: string, logoPath: string, name: string}
  documents: string;
  fundsDeposited: null | number;
  investmentId: string;
  isKycValid: boolean;
  managerId: string | number;
  nextClose: any;
  preferredContactMethod: any;
  stage: string;
  status: IDealActions;
  transactionId: string;
  userId: number;
}

