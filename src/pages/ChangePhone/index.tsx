import React, {useEffect} from 'react';
import Text from 'Standard/components/Text'
import {Row} from "Standard/styles/GlobalStyledComponents";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import {API_URL} from "api/constants";
import {useUserDataUpdate} from "../../hooks/useUpdateUserData";
import UpdateUserDataWrapper from "components/UpdateUserDataWrapper";
import {usePrevious} from 'Standard/hooks/usePrevious';
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import './index.scss'
import NoPageError from "../../Standard/components/404";
import {RouteName} from "../../router";

const ChangePhoneModal = () => {

  const {
    fetchUserAccountInfo,
    email,
    phone: userPhone,
    isServerError: isUserAccountInfoServerError
  } = useUserAccountInfo(`${API_URL}/api/users/contacts`)

  const [[phone, setPhone], phoneValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const prevPhoneRef = usePrevious(phone)

  const {
    fetchData,
    isServerError,
    serverErrorMessage,
    isWaitingForCode,
    isLoading,
    setIsWaitingForCode,
    setIsServerError
  } = useUserDataUpdate(
    {
      login: email,
      updatedPhone: phone,
    },
    `${API_URL}/api/auth/update/phone`
  )

  const setNewUserPhone = () => {
    if (!phoneValid) return
    fetchData()
  }

  useEffect(() => {
    if (isServerError && prevPhoneRef !== phone) {
      setIsServerError(false)
    }
  }, [isServerError, phone])

  useEffect(() => {
    fetchUserAccountInfo()
  }, [])

  return (
    <>
      {isUserAccountInfoServerError && <NoPageError isServerError={isUserAccountInfoServerError}/>}
      {!isUserAccountInfoServerError &&
        <UpdateUserDataWrapper
          title={'Change phone number'}
          submitButtonText={'Change phone number'}
          isValid={phoneValid}
          submitFunction={setNewUserPhone}
          isLoading={isLoading}
          isServerError={isServerError}
          serverErrorMessage={serverErrorMessage}
          isWaitingForCode={isWaitingForCode}
          setIsWaitingForCode={setIsWaitingForCode}
          email={email}
          sendCodeUrl={`${API_URL}/api/auth/update/phone/code`}
          appUrl={RouteName.ACCOUNT}
        >
          <Row gap={10}>
            <Text fontWeight={500} fontSize={16}>Current:</Text>
            <Text fontWeight={400} fontSize={16} color={'rgba(24, 24, 51, 0.7)'}>{userPhone}</Text>
          </Row>
          <div className='mb-5'/>

          <SimpleLabelContainer
            label={'New phone number'}
          >
            <PhoneInput
              isValid={phoneValid}
              specialLabel={''}
              country={'jp'}
              value={phone}
              onChange={setPhone}
              inputProps={{
                required: true,
                autoFocus: true
              }}
            />
          </SimpleLabelContainer>
        </UpdateUserDataWrapper>
      }
    </>
  );
};

export default ChangePhoneModal;