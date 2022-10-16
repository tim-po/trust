import React, {useContext, useEffect, useState} from 'react';
import {JustifyStartColumn} from 'Standard/styles/GlobalStyledComponents';
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import TrustButton from "Standard/components/TrustButton";
import useValidatedState, {validationFuncs, validationFuncsFactory} from "Standard/hooks/useValidatedState";
import SimpleAutocomplete from "Standard/components/SimpleAutocomplete";
import SimpleInput from "Standard/components/SimpleInput";
import styled from "styled-components";
import Text from "Standard/components/Text";
import {useUserDataUpdate} from "hooks/useUpdateUserData";
import {useSendCode} from "hooks/useSendCode";
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import {API_URL} from "api/constants";
import {useCookies} from "react-cookie";
import Spinner from "../../Standard/components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import {AnimatedWrapper} from "../../styles/StyledComponents";
import {useHistory} from "react-router-dom";
import {RouteName} from "../../router";
import NotificationContext from "../../Standard/utils/NotificationContext";
import ReturnPanel from "../../components/ReturnPanel";
import NoPageError from "../../Standard/components/404";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px 15%;
  width: 100%;
  z-index: 1;
`

const Wrapper = styled(JustifyStartColumn)`
  min-width: 480px;
  max-width: 700px;
  margin-top: 25px;
`

const ButtonWrapper = styled.div`
  width: 180px;
  margin-bottom: 20px;
`

const ChangeCommunicationMethodModal = () => {

  const {
    fetchUserAccountInfo,
    email,
    isServerError: isUserAccountInfoServerError
  } = useUserAccountInfo(`${API_URL}/api/users/contacts`)
  const notification = useContext(NotificationContext)
  const history = useHistory()

  const methods = [
    {type: 'TELEGRAM', value: 'Telegram'},
    {type: 'EMAIL', value: 'Email'},
    {type: 'WHATSUP', value: 'Whatsup'}
  ]

  const [[communicationMethods, setCommunicationMethods], communicationMethodsValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(methods.map(method => method.value)));
  const [[personalContact, setPersonalContact], personalDataValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const isValid = communicationMethodsValid && personalDataValid

  const {fetchData, isServerError, isLoading, serverErrorMessage, isWaitingForCode} = useUserDataUpdate(
    {
      login: email,
      type: communicationMethods.toUpperCase(),
      contact: personalContact
    },
    `${API_URL}/api/contacts/update`
  )

  const updateCommunicationMethod = () => {
    if (!isValid) return
    fetchData()
  }

  useEffect(() => {
    fetchUserAccountInfo()
  }, [])

  useEffect(() => {
    if (isWaitingForCode) {
      history.push(RouteName.ACCOUNT)
      notification.displayNotification(
        `Success`,
        'You successfully update your personal data',
      )
    }
  }, [isWaitingForCode])

  return (
    <>
      {isUserAccountInfoServerError && <NoPageError isServerError={isUserAccountInfoServerError}/>}
      {!isUserAccountInfoServerError &&
        <Container>
          <ReturnPanel appUrl={RouteName.ACCOUNT} title={'ACCOUNT'}/>
          <Wrapper>
            <Text fontWeight={600} fontSize={40}>Change communication method</Text>
            <div className={'mt-5'}/>
            <SimpleLabelContainer
              label={'Communication method'}
              id="shipping country-name"
            >
              <SimpleAutocomplete
                isValid={communicationMethodsValid}
                onChangeRaw={setCommunicationMethods}
                errorTooltipText={"Invalid communication method"}
                required
                placeholder={'Communication method'}
                autoComplete={"communication-method"}
                name={"communication-method"}
                id={"communication-method"}
                options={methods.map(method => {
                  return ({value: method.value})
                })}
                value={communicationMethods}
              />
            </SimpleLabelContainer>
            {communicationMethods && communicationMethodsValid &&
              <SimpleLabelContainer label={`Write your ${communicationMethods} contacts`} id="new-password-text-field">
                <SimpleInput
                  hasIcon
                  required
                  isValid={personalDataValid}
                  inputProps={{
                    placeholder: `Password`,
                    type: 'text',
                    name: "new-password",
                    className: "w-full"
                  }}
                  autoComplete={"new-password"}
                  id="new-password-text-field"
                  onChangeRaw={setPersonalContact}
                />
              </SimpleLabelContainer>
            }
            <ButtonWrapper>
              <TrustButton
                style='green'
                isValid={isValid}
                onClick={updateCommunicationMethod}>
                {
                  isLoading ?
                    <Spinner color="white" size={25}/>
                    :
                    <span>{'Change method'}</span>
                }
              </TrustButton>
            </ButtonWrapper>
            <AnimatedWrapper isActive={isServerError}>
              {isServerError &&
                <ErrorMessage message={serverErrorMessage} title={'Communication method change error'}/>}
            </AnimatedWrapper>
          </Wrapper>
        </Container>
      }
    </>
  );
};

export default ChangeCommunicationMethodModal;