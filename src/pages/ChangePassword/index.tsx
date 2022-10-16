import React, {useEffect, useState} from 'react';
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import ShowAndHidePassword from "components/ShowAndHidePassword";
import {API_URL} from 'api/constants';
import sha256 from "crypto-js/sha256";
import {useUserDataUpdate} from "hooks/useUpdateUserData";
import {useSendCode} from "hooks/useSendCode";
import UpdateUserDataWrapper from "components/UpdateUserDataWrapper";
import {RouteName} from "router";
import {usePrevious} from 'Standard/hooks/usePrevious';
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import NoPageError from 'Standard/components/404';

const ChangePasswordModal = () => {

  const {
    fetchUserAccountInfo,
    email,
    isServerError: isUserAccountInfoServerError
  } = useUserAccountInfo(`${API_URL}/api/users/contacts`)

  const [[currentPassword, setCurrentPassword], currentPasswordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[newPassword, setNewPassword], newPasswordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[newRepeatedPassword, setNewRepeatPassword], newRepeatedPasswordValid] = useValidatedState<string>("", newValue => newValue === newPassword);

  const [currentPasswordType, setCurrentPasswordType] = useState<"text" | "password">("password")
  const [newPasswordType, setNewPasswordType] = useState<"text" | "password">("password")
  const [newRepeatedPasswordType, setNewRepeatedPasswordType] = useState<"text" | "password">("password")

  const prevCurrentPasswordRef = usePrevious(currentPassword)
  const prevNewPasswordRef = usePrevious(newPassword)

  const isValid = currentPasswordValid && newPasswordValid && newRepeatedPasswordValid

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
      currentPassword: sha256(currentPassword).toString(),
      updatedPassword: sha256(newPassword).toString(),
    },
    `${API_URL}/api/auth/update/password`
  )

  const setNewUserPassword = () => {
    if (!isValid) return
    fetchData()
  }

  useEffect(() => {
    if (isServerError && (prevCurrentPasswordRef !== currentPassword || prevNewPasswordRef !== newPassword)) {
      setIsServerError(false)
    }
  }, [isServerError, currentPassword, newPassword])

  useEffect(() => {
    fetchUserAccountInfo()
  }, [])

  return (
    <>
      {isUserAccountInfoServerError && <NoPageError isServerError={isUserAccountInfoServerError}/>}
      {!isUserAccountInfoServerError &&
        <UpdateUserDataWrapper
          title={'Change password'}
          submitButtonText={'Change password'}
          isValid={isValid}
          submitFunction={setNewUserPassword}
          isLoading={isLoading}
          isServerError={isServerError}
          serverErrorMessage={serverErrorMessage}
          isWaitingForCode={isWaitingForCode}
          setIsWaitingForCode={setIsWaitingForCode}
          email={email}
          sendCodeUrl={`${API_URL}/api/auth/update/password/code`}
          appUrl={RouteName.ACCOUNT}
        >
          <SimpleLabelContainer label={'Current password'} id="new-password-text-field">
            <SimpleInput
              hasIcon
              Icon={<ShowAndHidePassword passwordType={currentPasswordType} setPasswordType={setCurrentPasswordType}/>}
              required
              isValid={currentPasswordValid}
              errorTooltipText={`Password should be longer than 8 characters`}
              inputProps={{
                placeholder: `Password`,
                type: `${currentPasswordType}`,
                name: "new-password",
                className: "w-full"
              }}
              autoComplete={"new-password"}
              id="new-password-text-field"
              onChangeRaw={setCurrentPassword}
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer label={'New password'} id="new-password-text-field">
            <SimpleInput
              hasIcon
              Icon={<ShowAndHidePassword passwordType={newPasswordType} setPasswordType={setNewPasswordType}/>}
              required
              isValid={newPasswordValid}
              errorTooltipText={`Password should be longer than 8 characters`}
              inputProps={{
                placeholder: `Password`,
                type: `${newPasswordType}`,
                name: "new-password",
                className: "w-full"
              }}
              autoComplete={"new-password"}
              id="new-password-text-field"
              onChangeRaw={setNewPassword}
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer label={'Repeat new password'} id="confirm-password-text-field">
            <SimpleInput
              hasIcon
              Icon={<ShowAndHidePassword passwordType={newRepeatedPasswordType}
                                         setPasswordType={setNewRepeatedPasswordType}/>}
              required
              isValid={newRepeatedPasswordValid}
              id="confirm-password-text-field"
              errorTooltipText={`Passwords should match`}
              inputProps={{
                placeholder: `Password`,
                type: `${newRepeatedPasswordType}`,
                name: "new-password",
                className: "w-full"
              }}
              autoComplete={"new-password"}
              onChangeRaw={setNewRepeatPassword}
            />
          </SimpleLabelContainer>
        </UpdateUserDataWrapper>
      }
    </>
  );
};

export default ChangePasswordModal;