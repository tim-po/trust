import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import Text from "components/Text";
import Wallet from "components/VerificationTiles/Wallet";
import IdentityInformation from "components/VerificationTiles/IdentityInformation";
import Documents from "components/VerificationTiles/Documents";
import VerificationIcon from "icons/Verified";
import Residence from "components/VerificationTiles/Residence";
import useValidatedState, {ControlledValidationState, validationFuncs} from "Standard/hooks/useValidatedState";
import {API_URL} from "api/constants";
import {Country} from "types/Country";
import {UserData} from 'types/UserData';
import Info from "icons/Info/index";
import {useCookies} from "react-cookie";
import ForceValidateContext from "Standard/ForceValidateContext";
import Disk from 'icons/Disk';
import TrustButton from "Standard/components/TrustButton";
import NoPageError from "Standard/components/404";

type VerificationPropType = {}

const VerificationDefaultProps = {};

const VerificationPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px;
  width: 100%;

  z-index: 1;

  @media screen and (max-width: 900px) {
    display: flex;
    padding: 12px 20px;
    align-items: center;
  }
`;

const FlexStartWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`

const FlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PaddingWrapper = styled.div`
  padding: 40px 50px;

  @media screen and (max-width: 900px) {
    padding: 25px 25px;
  }
`

const FormWrapper = styled.div`
  border: 1px solid #D2D5DA;
  border-radius: 16px;
  height: max-content;
  width: 800px;
  background: #fff;
  z-index: 1000;
  margin-top: 25px;
  @media screen and (max-width: 900px) {
    width: 90%;
  }
`

const SaveDataInfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #33CC66;
  height: 70px;
  gap: 8px;
  z-index: 1000;

  @media screen and (max-width: 900px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`

const IconWrapper = styled.div<{ height: number, width: number }>`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
`

const ButtonWrapper = styled.div`
  width: 220px;
`

const Verification = (props: VerificationPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[identityInformation, setIdentityInformation], identityInformationValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[residence, setResidence], residenceValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[wallet, setWallet], walletValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[documents, setDocuments], documentsValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);

  const [countries, setCountries] = useState<Country[]>([]);
  const [isCountriesError, setIsCountriesError] = useState(false);

  const [userData, setUserData] = useState<UserData | undefined>(undefined)
  const [isUserDataError, setIsUserDataError] = useState(false)

  const [isDocumentsError, setIsDocumentsError] = useState(false)

  const [isForceValid, setIsForceValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isUserVerified, setIsUserVerified] = useState(false)
  const [isUserSubmitted, setIsUserSubmitted] = useState(false)
  const [isUserStatusError, setIsUserStatusError] = useState(false)

  const [cookies] = useCookies(["auth"]);

  const isValid =
    documentsValid &&
    identityInformationValid &&
    residenceValid &&
    walletValid;

  const isServerError = isUserStatusError || isUserDataError || isDocumentsError

  const getCountries = () => {
    const registrationUrl = `${API_URL}/api/countries`;
    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    };

    fetch(registrationUrl, requestOptions)
      .then(res => res.json())
      .then(countries => setCountries(countries))
      .catch((e) => setIsCountriesError(true))
  };

  async function sendUserData() {

    setIsForceValid(true)

    if (!isValid) {
      return;
    }

    const userData = {
      wallet: wallet.data.wallet,
      ...identityInformation.data,
      ...residence.data,
      ...documents.data
    };

    const verificationUrl = `${API_URL}/api/validation`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
      body: JSON.stringify(userData)
    };

    fetch(verificationUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          getUserData()
        }
      })
      .catch(e => console.log(e));
  }

  async function getUserData() {
    setIsLoading(true)
    const userDataUrl = `${API_URL}/api/validation/data`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      }
    };

    fetch(userDataUrl, requestOptions)
      .then(res => res.json())
      .then(userData => {
        if (userData.statusCode === 200) {
          setUserData(userData)
          if (isUserSubmitted) {
            localStorage.setItem("identityInformation", JSON.stringify({
              nationality: userData.nationality.value,
              firstName: userData.firstName.value,
              middleName: userData.middleName.value,
              lastName: userData.lastName.value,
              bDate: userData.bDate.value
            }));
            localStorage.setItem("residence", JSON.stringify({
              country: userData.country.value,
              city: userData.city.value,
              zip: userData.zip.value,
              mainStreet: userData.mainStreet.value,
              additionalStreet: userData.additionalStreet.value,
              region: userData.region.value
            }));
            localStorage.setItem("wallet", JSON.stringify({
              wallet: userData.wallets.main.value,
              isBSCNetwork: !!userData.wallet.value
            }));
          }
        } else {
          setIsUserDataError(true)
        }
      })
      .catch((e) => console.log(''))
      .finally(() => setIsLoading(false))
  }

  async function getStatusOfUser() {
    const userStatusUrl = `${API_URL}/api/validation/token`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      }
    };

    fetch(userStatusUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          setIsUserVerified(json.isVerified);
          setIsUserSubmitted(json.isSubmitted)
        } else {
          setIsUserStatusError(true)
        }
      })
      .catch(e => {
      })
  }

  useEffect(() => {
    getCountries();
    getUserData();
    getStatusOfUser();
  }, []);

  return (
    <>
      {isServerError && <NoPageError isServerError={isServerError}/>}
      {!isServerError &&
        <ForceValidateContext.Provider value={{setForceValidate: setIsForceValid, forceValidate: isForceValid}}>
          <VerificationPageContainer>
            <Text fontWeight={600} fontSize={40}>{localized(texts.pageTitle, locale)}</Text>
            {isUserSubmitted && <Text fontWeight={400} fontSize={20}>{localized(texts.buttonTextCheck, locale)}</Text>}
            <FormWrapper>
              <PaddingWrapper>
                {isUserVerified ?
                  <Text
                    fontWeight={600}
                    fontSize={24}
                    color={'#33CC66'}
                    marginBottom={12}
                  >
                    {localized(texts.documentsWarning, locale)}
                  </Text>
                  :
                  <FlexStartWrapper>
                    <IconWrapper width={30} height={30}>
                      <Info/>
                    </IconWrapper>
                    <FlexColumnWrapper>
                      <Text fontWeight={600} fontSize={24} color={'#33CC66'}
                            marginBottom={12} adaptiveFontWeight={16}>{localized(texts.documentsWarning, locale)}</Text>
                      <Text fontWeight={600} fontSize={16}
                            color={'#181833'} adaptiveFontWeight={12}>{localized(texts.noChangeWarning, locale)}</Text>
                    </FlexColumnWrapper>
                  </FlexStartWrapper>
                }
              </PaddingWrapper>
              <SaveDataInfoBlock>
                <IconWrapper width={20} height={20}>
                  <Disk/>
                </IconWrapper>
                <Text fontWeight={600} fontSize={14} color={'#fff'}
                      adaptiveFontWeight={12}>{localized(texts.automaticallySave, locale)}</Text>
              </SaveDataInfoBlock>
              <PaddingWrapper>
                <Wallet
                  onChangeData={setWallet}
                  fieldStatus={{
                    wallet: userData?.wallets.main
                  }}
                  isLoading={isLoading}
                />
                <IdentityInformation
                  countries={countries}
                  onChangeData={setIdentityInformation}
                  fieldsStatus={{
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    middleName: userData?.middleName,
                    bDate: userData?.bDate,
                    nationality: userData?.nationality,
                  }}
                  isLoading={isLoading}
                />
                <Residence
                  countries={countries}
                  onChangeData={setResidence}
                  fieldsStatus={{
                    mainStreet: userData?.mainStreet,
                    additionalStreet: userData?.additionalStreet,
                    region: userData?.region,
                    city: userData?.city,
                    country: userData?.country,
                    zip: userData?.zip
                  }}
                  isLoading={isLoading}
                />
                <Documents
                  documentsStatus={{
                    mainDocument: userData?.mainDocument,
                    additionalDocument: userData?.additionalDocument
                  }}
                  onChangeData={setDocuments}
                  isSubmitted={isUserSubmitted}
                  isLoading={isLoading}
                  setIsDocumentsError={setIsDocumentsError}
                />
                <FlexStartWrapper>
                  <IconWrapper width={20} height={20}>
                    <VerificationIcon/>
                  </IconWrapper>
                  <Text fontSize={16} fontWeight={500} adaptiveFontWeight={14}
                        color={'#33CC66'}>{localized(texts.termOfUse, locale)}</Text>
                </FlexStartWrapper>
                <div className='mb-4'/>
                {!isUserVerified &&
                  <ButtonWrapper>
                    <TrustButton
                      style='green'
                      isValid={isValid}
                      onClick={isUserSubmitted ? () => {
                      } : sendUserData}
                    >
                      {localized(texts.buttonTextVerify, locale)}
                    </TrustButton>
                  </ButtonWrapper>
                }
              </PaddingWrapper>
            </FormWrapper>
          </VerificationPageContainer>
        </ForceValidateContext.Provider>}
    </>
  );
};

Verification.defaultProps = VerificationDefaultProps;

export default Verification;