import React, {useEffect, useState} from 'react';
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import SimpleInput from "Standard/components/SimpleInput";
import ShowAndHidePassword from "components/ShowAndHidePassword";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import {useUserDataUpdate} from "hooks/useUpdateUserData";
import sha256 from "crypto-js/sha256";
import {API_URL} from "api/constants";
import UpdateUserDataWrapper from "components/UpdateUserDataWrapper";
import {RouteName} from "router";
import {usePrevious} from 'Standard/hooks/usePrevious';
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import NoPageError from "../../Standard/components/404";

const DeleteAccountModal = () => {

  const {
    fetchUserAccountInfo,
    email,
    isServerError: isUserAccountInfoServerError
  } = useUserAccountInfo(`${API_URL}/api/users/contacts`)

  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);

  const prevPasswordRef = usePrevious(password)

  const [passwordType, setPasswordType] = useState<"text" | "password">("password")

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
      password: sha256(password).toString()
    },
    `${API_URL}/api/auth/delete`,
  )

  const deleteAccount = () => {
    if (!passwordValid) return
    fetchData()
  }

  useEffect(() => {
    if (isServerError && prevPasswordRef !== password) {
      setIsServerError(false)
    }
  }, [isServerError, password])

  useEffect(() => {
    fetchUserAccountInfo()
  }, [])

  return (
    <>
      {isUserAccountInfoServerError && <NoPageError isServerError={isUserAccountInfoServerError}/>}
      {!isUserAccountInfoServerError &&
        <UpdateUserDataWrapper
          title={'Delete account'}
          submitButtonText={'Delete account'}
          isValid={passwordValid}
          submitFunction={deleteAccount}
          isLoading={isLoading}
          isServerError={isServerError}
          serverErrorMessage={serverErrorMessage}
          isWaitingForCode={isWaitingForCode}
          setIsWaitingForCode={setIsWaitingForCode}
          email={email}
          sendCodeUrl={`${API_URL}/api/auth/delete/code`}
          appUrl={RouteName.LOGIN}
        >
          <SimpleLabelContainer label={'Password'} id="confirm-password-text-field">
            <SimpleInput
              hasIcon
              Icon={<ShowAndHidePassword passwordType={passwordType} setPasswordType={setPasswordType}/>}
              required
              isValid={passwordValid}
              id="confirm-password-text-field"
              errorTooltipText={`Password should be longer than 8 characters`}
              inputProps={{
                placeholder: `Password`,
                type: `${passwordType}`,
                name: "new-password",
                className: "w-full"
              }}
              autoComplete={"new-password"}
              onChangeRaw={setPassword}
            />
          </SimpleLabelContainer>
        </UpdateUserDataWrapper>
      }
    </>
  );
};

export default DeleteAccountModal;