import React, {useContext, useEffect, useRef, useState} from 'react';
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

const ForgotPassword = () => {

  const [[newPassword, setNewPassword], newPasswordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[newRepeatedPassword, setNewRepeatPassword], newRepeatedPasswordValid] = useValidatedState<string>("", newValue => newValue === newPassword);
  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);

  const [newPasswordType, setNewPasswordType] = useState<"text" | "password">("password")
  const [newRepeatedPasswordType, setNewRepeatedPasswordType] = useState<"text" | "password">("password")

  const prevNewPasswordRef = usePrevious(newPassword)
  const prevNewRepeatedPasswordRef = usePrevious(newRepeatedPassword)

  const isValid = newPasswordValid && newRepeatedPasswordValid

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
      updatedPassword: sha256(newPassword).toString(),
    },
    `${API_URL}/api/auth/recovery/password`
  )

  const setNewUserPassword = () => {
    if (!isValid) return
    fetchData()
  }

  useEffect(() => {
    if (isServerError && (prevNewRepeatedPasswordRef !== newRepeatedPassword || prevNewPasswordRef !== newPassword)) {
      setIsServerError(false)
    }
  }, [isServerError, newRepeatedPassword, newPassword])

  return (
    <UpdateUserDataWrapper
      title={'Forgot password'}
      submitButtonText={'Update password'}
      isValid={isValid}
      submitFunction={setNewUserPassword}
      isLoading={isLoading}
      isServerError={isServerError}
      serverErrorMessage={serverErrorMessage}
      isWaitingForCode={isWaitingForCode}
      setIsWaitingForCode={setIsWaitingForCode}
      email={email}
      sendCodeUrl={`${API_URL}/api/auth/recovery/password/code`}
      appUrl={RouteName.LOGIN}
    >
      <SimpleLabelContainer
      label={'Email'}
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
  );
};

export default ForgotPassword;