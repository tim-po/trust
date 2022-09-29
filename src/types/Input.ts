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