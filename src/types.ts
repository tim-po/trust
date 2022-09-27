import React from "react";

export type Country = {
    code: string,
    name: string
}

export type UserData = {
  wallet: FieldStatus,
  additionalStreet: FieldStatus
  bDate: FieldStatus
  city: FieldStatus
  country: FieldStatus
  firstName: FieldStatus
  isSubmitted: boolean
  isVerified: boolean
  lastName: FieldStatus
  mainStreet:FieldStatus
  middleName: FieldStatus
  nationality: FieldStatus
  region: FieldStatus
  street: FieldStatus
  zip: FieldStatus,
  mainDocument: FieldStatus,
  additionalDocument: FieldStatus
}

export type FieldStatus = {
  status: 'WAITING_FOR_USER' | 'PROCESSING_BY_ADMIN' | 'VERIFIED'
}

export enum InputsStatusEnum {
  DEFAULT = '',
  WAITING_FOR_USER = 'WAITING_FOR_USER',
  PROCESSING_BY_ADMIN = 'PROCESSING_BY_ADMIN',
  VERIFIED = 'VERIFIED'
}

export type AllFieldsDict = {
  [key: string]: {
    required: boolean,
    id: string,
    autoComplete: string,
    label: {
      en: string,
      ja: string
    },
    inputStatus: InputsStatusEnum,
    value: string,
    isValid: boolean,
    onChange: (newState: string) => void
  }
}

export type NavItems = React.ReactElement

export enum ConnectorButtonsEnum {
  ACCOUNT = 'Account',
  PERSONAL_DATA = 'Personal data',
  SECURITY_SETTINGS = 'Security settings',
  PAYMENT_INFORMATION = 'Payment information',
  LOGOUT = 'Logout'
}

export enum NavItemsEnum {
  INVEST = 'Invest',
  MANAGE = 'Manage'
}