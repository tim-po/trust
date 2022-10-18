import {InputsStatusEnum} from "./Input";

export type FieldStatus = {
  status: 'WAITING_FOR_USER' | 'PROCESSING_BY_ADMIN' | 'VERIFIED'
}

export type IField = { value: string, status: InputsStatusEnum }

export type IdentityInformationType = {
  nationality: IField | undefined,
  firstName: IField | undefined,
  middleName: IField | undefined,
  lastName: IField | undefined,
  bDate: IField | undefined
}

export type ResidenceType = {
  country: IField | undefined,
  city: IField | undefined,
  zip: IField | undefined,
  mainStreet: IField | undefined,
  additionalStreet: IField | undefined,
  region: IField | undefined
}

export type WalletType = {
  wallets: {
    main: IField | undefined,
    additional: IField[] | undefined
  }
}

export type DocumentsType = {
  main: FieldStatus | undefined,
  additional: FieldStatus | undefined
}

export type UserData = {
  wallets: {
    main: FieldStatus,
    additional: FieldStatus[]
  },
  additionalStreet: FieldStatus
  bDate: FieldStatus
  city: FieldStatus
  country: FieldStatus
  firstName: FieldStatus
  isSubmitted: boolean
  isVerified: boolean
  lastName: FieldStatus
  mainStreet: FieldStatus
  middleName: FieldStatus
  nationality: FieldStatus
  region: FieldStatus
  street: FieldStatus
  zip: FieldStatus,
  mainDocument: {token: string, status: string},
  additionalDocument: {token: string, status: string}
}