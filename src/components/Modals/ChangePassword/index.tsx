import React, {useState} from 'react';
import {JustifyStartColumn} from "Standard/styles/GlobalStyledComponents";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleInput from "Standard/components/SimpleInput";
import TrustButton from "Standard/components/TrustButton";
import ShowAndHidePassword from "../../ShowAndHidePassword";

const ChangePasswordModal = () => {
  const [[currentPassword, setCurrentPassword], currentPasswordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[newPassword, setNewPassword], newPasswordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[newRepeatedPassword, setNewRepeatPassword], newRepeatedPasswordValid] = useValidatedState<string>("", newValue => newValue === newPassword);

  const [currentPasswordType, setCurrentPasswordType] = useState<"text" | "password">("password")
  const [newPasswordType, setNewPasswordType] = useState<"text" | "password">("password")
  const [newRepeatedPasswordType, setNewRepeatedPasswordType] = useState<"text" | "password">("password")

  const isValid = currentPasswordValid && newPasswordValid && newRepeatedPasswordValid

  return (
    <JustifyStartColumn>
      <div className='mt-5' />
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
          Icon={<ShowAndHidePassword passwordType={newRepeatedPasswordType} setPasswordType={setNewRepeatedPasswordType}/>}
          required
          isValid={newRepeatedPasswordValid}
          id="confirm-password-text-field"
          errorTooltipText={`Password should be longer than 8 characters`}
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
      <TrustButton style='green' isValid={isValid}>Change Password</TrustButton>
    </JustifyStartColumn>
  );
};

export default ChangePasswordModal;