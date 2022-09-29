export type FieldStatus = {
  status: 'WAITING_FOR_USER' | 'PROCESSING_BY_ADMIN' | 'VERIFIED'
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