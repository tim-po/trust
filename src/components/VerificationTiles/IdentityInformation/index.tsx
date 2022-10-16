import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import "./index.css";
import VerificationTile from "components/VerificationTile";
import Text from "../../Text";
import styled from "styled-components";
import useValidatedState, {
  validationDateFuncs,
  validationFuncs,
  validationFuncsFactory
} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import SimpleDatePicker from "Standard/components/SimpleDatePicker";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "Standard/components/SimpleAutocomplete";
import {Country} from "types/Country";
import setInnerValueInLocalStorage from "utils/setInnerValueInLocalStorage";
import CheckMark from "icons/CheckMark";
import {AllFieldsDict, InputsStatusEnum} from "types/Input";
import useIsFirstRender from "Standard/hooks/useIsFirstRender";
import {FieldStatus} from "types/UserData";

type IdentityInformationPropType = {
  onChangeData: (data: any) => void
  countries: Country[],
  fieldsStatus: {
    firstName: FieldStatus | undefined,
    lastName: FieldStatus | undefined,
    nationality: FieldStatus | undefined,
    middleName: FieldStatus | undefined,
    bDate: FieldStatus | undefined
  },
  isLoading: boolean
}

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const IdentityInformation = (props: IdentityInformationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData, countries, fieldsStatus, isLoading} = props;

  const [localStorageData, setLocalStorageData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    nationality: "",
    bDate: ""
  })

  const [[firstName, setFirstName], firstNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[lastName, setLastName], lastNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [middleName, setMiddleName] = useState<string>("");
  const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(countries.map(ctr => ctr.name)));
  const [[bDate, setBDate], bDateValid] = useValidatedState<string>("", validationDateFuncs.dateIsNotGreaterThanToday);

  const isFirstRender = useIsFirstRender()

  const IdentityInformationFormFields: AllFieldsDict = {
    firstName: {
      required: true,
      id: "firstName",
      autoComplete: "firstName",
      label: texts.firstNameLabel,
      onChange: setFirstName,
      inputStatus: fieldsStatus.firstName ? InputsStatusEnum[fieldsStatus.firstName.status] : InputsStatusEnum.DEFAULT,
      value: firstName,
      isValid: firstNameValid
    },
    lastName: {
      required: true,
      id: "firstName",
      autoComplete: "firstName",
      label: texts.lastNameLabel,
      onChange: setLastName,
      inputStatus: fieldsStatus.lastName ? InputsStatusEnum[fieldsStatus.lastName.status] : InputsStatusEnum.DEFAULT,
      value: lastName,
      isValid: lastNameValid
    },
    middleName: {
      required: false,
      id: "firstName",
      autoComplete: "firstName",
      label: texts.middleNameLabel,
      onChange: setMiddleName,
      inputStatus: fieldsStatus.middleName ? InputsStatusEnum[fieldsStatus.middleName.status] : InputsStatusEnum.DEFAULT,
      value: middleName,
      isValid: true
    }
  }

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('identityInformation', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

  useEffect(() => {
    const identityInformation = localStorage.getItem("identityInformation");
    const parsed = JSON.parse(`${identityInformation}`)
    if (parsed) {
      setLocalStorageData(parsed);
    }
    if (localStorageData.firstName) {
      setFirstName(localStorageData.firstName)
    }
    if (localStorageData.lastName) {
      setLastName(localStorageData.lastName)
    }
    if (localStorageData.middleName) {
      setMiddleName(localStorageData.middleName)
    }
    if (localStorageData.nationality) {
      setNationality(localStorageData.nationality)
    }
    if (localStorageData.bDate) {
      setBDate(localStorageData.bDate)
    }
  }, [isFirstRender, localStorageData.firstName, localStorageData.bDate, localStorageData.lastName, localStorageData.middleName, localStorageData.nationality, countries])

  useEffect(() => {
    setInnerValueInLocalStorage(
      {
        data: {nationality, firstName, lastName, middleName, bDate},
        isValid: firstNameValid && lastNameValid && nationalityValid && bDateValid
      },
      'identityInformation',
      isFirstRender,
      onChangeData
    )
  }, [nationality, firstName, lastName, middleName, bDate, firstNameValid, lastNameValid, nationalityValid, bDateValid]);

  useEffect(() => {
  }, [fieldsStatus])

  return (
    <VerificationTile>
      <form autoComplete={"on"}>
        <Text fontSize={24} color={"#000"}>{localized(texts.tileTitle, locale)}</Text>
        <div className={"mb-4"}/>
        <FlexWrapper>
          <div className="flex">
            <SimpleLabelContainer
              displayAsLabel={
                fieldsStatus.nationality?.status === InputsStatusEnum.VERIFIED ||
                fieldsStatus.nationality?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
              }
              label={localized(texts.nationalityLabel, locale)}
              id="shipping country-name"
            >
              <SimpleAutocomplete
                isValid={nationalityValid}
                onChangeRaw={setNationality}
                displayAsLabel={
                  fieldsStatus.nationality?.status === InputsStatusEnum.VERIFIED ||
                  fieldsStatus.nationality?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
                }
                errorTooltipText={"Please select valid country"}
                required
                placeholder={localized(texts.nationalityLabel, locale)}
                autoComplete={"shipping country-name"}
                name={"shipping country-name"}
                id={"shipping country-name"}
                options={countries.map(ctr => {
                  return ({value: ctr.name})
                })}
                value={nationality}
                className={`${isLoading && 'skeleton'}`}
              />
            </SimpleLabelContainer>
            {fieldsStatus.nationality && fieldsStatus.nationality.status === InputsStatusEnum.VERIFIED && <CheckMark color={'#33CC66'} height={20} width={20}/>}
          </div>
          {Object.keys(IdentityInformationFormFields).map((field) => (
            <div className="flex" key={field}>
              <SimpleLabelContainer
                displayAsLabel={
                  IdentityInformationFormFields[field].inputStatus === InputsStatusEnum.PROCESSING_BY_ADMIN ||
                  IdentityInformationFormFields[field].inputStatus === InputsStatusEnum.VERIFIED
                }
                label={localized(IdentityInformationFormFields[field].label, locale)}
                id={IdentityInformationFormFields[field].id}
              >
                <SimpleInput
                  onlyEmmitOnBlur
                  onChangeRaw={IdentityInformationFormFields[field].onChange}
                  required={IdentityInformationFormFields[field].required}
                  isValid={IdentityInformationFormFields[field].isValid}
                  displayAsLabel={
                    IdentityInformationFormFields[field].inputStatus === InputsStatusEnum.PROCESSING_BY_ADMIN ||
                    IdentityInformationFormFields[field].inputStatus === InputsStatusEnum.VERIFIED
                  }
                  inputProps={{
                    className: `w-full ${isLoading && 'skeleton'}`,
                    placeholder: `${localized(IdentityInformationFormFields[field].label, locale)}`,
                    value: IdentityInformationFormFields[field].value
                  }}
                  autoComplete={IdentityInformationFormFields[field].autoComplete}
                  id={IdentityInformationFormFields[field].id}
                />
              </SimpleLabelContainer>
              {IdentityInformationFormFields[field].inputStatus === InputsStatusEnum.VERIFIED && <CheckMark color={'#33CC66'} height={20} width={20}/>}
            </div>
          ))}
          <div className="flex">
            <SimpleLabelContainer
              displayAsLabel={
                fieldsStatus.bDate?.status === InputsStatusEnum.VERIFIED ||
                fieldsStatus.bDate?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
              }
              label={localized(texts.birthDateLabel, locale)}
              id={"birthdate"}
            >
              <SimpleDatePicker
                value={bDate}
                displayAsLabel={
                  fieldsStatus.bDate?.status === InputsStatusEnum.VERIFIED ||
                  fieldsStatus.bDate?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
                }
                onChangeRaw={setBDate}
                isValid={bDateValid}
                required
                errorTooltipText={"Please enter a date in the past"}
                autoComplete={"birthdate"}
                id={"birthdate"}
                className={`${isLoading && 'skeleton'}`}
              />
            </SimpleLabelContainer>
            {fieldsStatus.bDate && fieldsStatus.bDate.status === InputsStatusEnum.VERIFIED && <CheckMark color={'#33CC66'} height={20} width={20}/>}
          </div>
        </FlexWrapper>
      </form>
    </VerificationTile>
  );
};

export default IdentityInformation;