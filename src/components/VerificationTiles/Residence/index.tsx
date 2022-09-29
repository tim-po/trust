import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import "./index.css";
import VerificationTile from "components/VerificationTile";
import Text from "components/Text";
import styled from "styled-components";
import useValidatedState, {validationFuncs, validationFuncsFactory} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import {AllFieldsDict, InputsStatusEnum} from "types/Input";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "Standard/components/SimpleAutocomplete";
import useIsFirstRender from "Standard/hooks/useIsFirstRender";
import CheckMark from "icons/CheckMark";
import {Country} from "types/Country";
import {FieldStatus} from "types/UserData";

type ResidencePropType = {
  onChangeData: (data: any) => void,
  countries: Country[]
  fieldsStatus: {
    mainStreet: FieldStatus | undefined,
    additionalStreet: FieldStatus | undefined,
    region: FieldStatus | undefined,
    city: FieldStatus | undefined,
    country: FieldStatus | undefined,
    zip: FieldStatus | undefined
  },
  isLoading: boolean
}

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Residence = (props: ResidencePropType) => {
  const {onChangeData, countries, fieldsStatus, isLoading} = props;
  const {locale} = useContext(LocaleContext);

  const [localStorageData, setLocalStorageData] = useState({
    mainStreet: "",
    additionalStreet: "",
    region: "",
    city: "",
    country: "",
    zip: ""
  });

  const [[country, setCountry], countryValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(countries.map(ctr => ctr.name)));
  const [[city, setCity], cityValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[zip, setZip], zipValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[mainStreet, setMainStreet], mainStreetValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[additionalStreet, setAdditionalStreet], additionalStreetValid] = useValidatedState<string>("", (newValue) => true);
  const [[region, setRegion], regionValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const isFirstRender = useIsFirstRender()

  const ResidenceInformationFormFields: AllFieldsDict = {
    region: {
      required: true,
      id: "address-level1",
      autoComplete: "shipping address-level1",
      label: texts.region,
      onChange: setRegion,
      inputStatus: fieldsStatus.region ? InputsStatusEnum[fieldsStatus.region.status] : InputsStatusEnum.DEFAULT,
      value: region,
      isValid: regionValid
    },
    city: {
      required: true,
      id: "city-name",
      autoComplete: "shipping city-name",
      label: texts.cityLabel,
      onChange: setCity,
      inputStatus: fieldsStatus.city ? InputsStatusEnum[fieldsStatus.city.status] : InputsStatusEnum.DEFAULT,
      value: city,
      isValid: cityValid
    },
    zip: {
      required: true,
      id: "zip-code",
      autoComplete: "shipping zip-code",
      label: texts.postalCodeLabel,
      onChange: setZip,
      inputStatus: fieldsStatus.zip ? InputsStatusEnum[fieldsStatus.zip.status] : InputsStatusEnum.DEFAULT,
      value: zip,
      isValid: zipValid
    },
    mainStreet: {
      required: true,
      id: "shipping address",
      autoComplete: "shipping address",
      label: texts.mainAddressLabel,
      onChange: setMainStreet,
      inputStatus: fieldsStatus.mainStreet ? InputsStatusEnum[fieldsStatus.mainStreet.status] : InputsStatusEnum.DEFAULT,
      value: mainStreet,
      isValid: mainStreetValid
    },
    additionalStreet: {
      required: false,
      id: "shipping address",
      autoComplete: "shipping address",
      label: texts.additionalAddressLabel,
      onChange: setAdditionalStreet,
      inputStatus: fieldsStatus.additionalStreet ? InputsStatusEnum[fieldsStatus.additionalStreet.status] : InputsStatusEnum.DEFAULT,
      value: additionalStreet,
      isValid: true
    }
  }

  function setResidenceInner(residence: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem("residence", JSON.stringify(residence.data));
      onChangeData(residence);
    }
  }

  useEffect(() => {
    const residence = localStorage.getItem("residence");
    const parsed = JSON.parse(`${residence}`);
    if (parsed) {
      setLocalStorageData(parsed);
    }
    if (localStorageData.country) {
      setCountry(localStorageData.country);
    }
    if (localStorageData.city) {
      setCity(localStorageData.city);
    }
    if (localStorageData.zip) {
      setZip(localStorageData.zip);
    }
    if (localStorageData.mainStreet) {
      setMainStreet(localStorageData.mainStreet);
    }
    if (localStorageData.additionalStreet) {
      setAdditionalStreet(localStorageData.additionalStreet);
    }
    if (localStorageData.region) {
      setRegion(localStorageData.region)
    }
  }, [isFirstRender,
    localStorageData.country,
    localStorageData.city,
    localStorageData.zip,
    localStorageData.mainStreet,
    localStorageData.additionalStreet,
    localStorageData.region,
    countries]);

  useEffect(() => {
    setResidenceInner({
      data: {country, city, zip, mainStreet, additionalStreet, region},
      isValid: countryValid && cityValid && zipValid && (mainStreetValid || additionalStreetValid) && regionValid
    });
  }, [country, city, zip, mainStreet, additionalStreet, countryValid, cityValid, zipValid, mainStreetValid, additionalStreetValid, regionValid, region]);

  return (
    <VerificationTile isValid={countryValid && cityValid && zipValid && (mainStreetValid || additionalStreetValid)}>
      <Text fontSize={24} color={"#000"}>{localized(texts.tileTitle, locale)}</Text>
      <div className={"mb-4"}/>
      <FlexWrapper>
        <div className="flex">
          <SimpleLabelContainer
            displayAsLabel={
              fieldsStatus.country?.status === InputsStatusEnum.VERIFIED ||
              fieldsStatus.country?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
            }
            label={localized(texts.residenceLabel, locale)}
            id={"country-name"}
          >
            <SimpleAutocomplete
              isValid={countryValid}
              displayAsLabel={
                fieldsStatus.country?.status === InputsStatusEnum.VERIFIED ||
                fieldsStatus.country?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
              }
              onChangeRaw={setCountry}
              errorTooltipText={"Please select valid country"}
              required
              placeholder={localized(texts.residenceLabel, locale)}
              autoComplete={"country-name"}
              id={"country-name"}
              name={"country-name"}
              options={countries.map(ctr => {
                return ({value: ctr.name});
              })}
              value={country}
              className={`${isLoading && 'skeleton'}`}
            />
          </SimpleLabelContainer>
          {fieldsStatus.country && fieldsStatus.country.status === InputsStatusEnum.VERIFIED && <CheckMark/>}
        </div>
        {Object.keys(ResidenceInformationFormFields).map((field) => (
          <div className="flex" key={field}>
            <SimpleLabelContainer
              displayAsLabel={
                ResidenceInformationFormFields[field].inputStatus === InputsStatusEnum.PROCESSING_BY_ADMIN ||
                ResidenceInformationFormFields[field].inputStatus === InputsStatusEnum.VERIFIED
              }
              label={localized(ResidenceInformationFormFields[field].label, locale)}
              id={ResidenceInformationFormFields[field].id}
            >
              <SimpleInput
                onlyEmmitOnBlur
                onChangeRaw={ResidenceInformationFormFields[field].onChange}
                required={ResidenceInformationFormFields[field].required}
                isValid={ResidenceInformationFormFields[field].isValid}
                displayAsLabel={
                  ResidenceInformationFormFields[field].inputStatus === InputsStatusEnum.PROCESSING_BY_ADMIN ||
                  ResidenceInformationFormFields[field].inputStatus === InputsStatusEnum.VERIFIED
                }
                inputProps={{
                  className: `w-full ${isLoading && 'skeleton'}`,
                  placeholder: `${localized(ResidenceInformationFormFields[field].label, locale)}`,
                  value: ResidenceInformationFormFields[field].value
                }}
                autoComplete={ResidenceInformationFormFields[field].autoComplete}
                id={ResidenceInformationFormFields[field].id}
              />
            </SimpleLabelContainer>
            {ResidenceInformationFormFields[field].inputStatus === InputsStatusEnum.VERIFIED && <CheckMark/>}
          </div>
        ))}
      </FlexWrapper>
    </VerificationTile>
  );
};

export default Residence;