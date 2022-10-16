import React, {useEffect} from 'react';
import Text from 'Standard/components/Text'
import {Row} from "Standard/styles/GlobalStyledComponents";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import {API_URL} from "api/constants";
import {useUserDataUpdate} from "hooks/useUpdateUserData";
import UpdateUserDataWrapper from "components/UpdateUserDataWrapper";
import {usePrevious} from 'Standard/hooks/usePrevious';
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import NoPageError from "../../Standard/components/404";
import {RouteName} from "../../router";

const ChangeEmailModal = () => {

  const {
    fetchUserAccountInfo,
    email: userEmail,
    isServerError: isUserAccountInfoServerError
  } = useUserAccountInfo(`${API_URL}/api/users/contacts`)

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);

  const prevEmailRef = usePrevious(email)

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
      login: userEmail,
      updatedEmail: email
    },
    `${API_URL}/api/auth/update/email`
  )

  const setNewUserEmail = () => {
    if (!emailValid) return
    fetchData()
  }

  useEffect(() => {
    if (isServerError && prevEmailRef !== email) {
      setIsServerError(false)
    }
  }, [isServerError, email])

  useEffect(() => {
    fetchUserAccountInfo()
  }, [])

  return (
    <>
      {isUserAccountInfoServerError && <NoPageError isServerError={isUserAccountInfoServerError}/>}
      {!isUserAccountInfoServerError &&
        <UpdateUserDataWrapper
          title={'Change email'}
          submitButtonText={'Change email'}
          isValid={emailValid}
          submitFunction={setNewUserEmail}
          isLoading={isLoading}
          isServerError={isServerError}
          serverErrorMessage={serverErrorMessage}
          isWaitingForCode={isWaitingForCode}
          setIsWaitingForCode={setIsWaitingForCode}
          email={userEmail}
          sendCodeUrl={`${API_URL}/api/auth/update/email/code`}
          appUrl={RouteName.ACCOUNT}
        >
          <Row gap={10}>
            <Text fontWeight={500} fontSize={16}>Current:</Text>
            <Text fontWeight={400} fontSize={16} color={'rgba(24, 24, 51, 0.7)'}>{userEmail}</Text>
          </Row>
          <div className='mb-5'/>
          <SimpleLabelContainer
            label={'New Email'}
          >
            <SimpleInput
              displayAsLabel={isWaitingForCode}
              onlyEmmitOnBlur
              onChangeRaw={setEmail}
              required
              isValid={emailValid}
              errorTooltipText={'Incorrect Email'}
              inputProps={{
                className: `w-full`,
                placeholder: `Email`,
                value: email
              }}
            />
          </SimpleLabelContainer>
        </UpdateUserDataWrapper>}
    </>
  );
};

export default ChangeEmailModal;