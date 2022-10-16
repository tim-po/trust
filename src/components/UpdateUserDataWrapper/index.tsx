import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import {JustifyStartColumn} from "Standard/styles/GlobalStyledComponents";
import TrustButton from "Standard/components/TrustButton";
import ErrorMessage from "../ErrorMessage";
import TwoFA from "pages/TwoFA";
import {RouteName} from "router";
import Text from "Standard/components/Text";
import Spinner from "Standard/components/Spinner";
import {AnimatedWrapper} from "styles/StyledComponents";
import ReturnPanel from "../ReturnPanel";

type UpdateUserDataWrapperPropType = {
  children: React.ReactNode[] | React.ReactNode,
  title: string,
  submitButtonText: string,
  isValid: boolean,
  submitFunction: () => void,
  isLoading: boolean,
  isServerError: boolean,
  serverErrorMessage: string,
  isWaitingForCode: boolean,
  setIsWaitingForCode: (value: boolean) => void,
  appUrl?: string,
  returnPanelTitle?: string,
  email: string,
  sendCodeUrl: string
}

const UpdateUserDataWrapperDefaultProps = {}

const Container = styled.div`
  position: relative;
  height: max-content;
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
  margin-top: 20px;
`

const ChildrenWrapper = styled(JustifyStartColumn)<{ isActive: boolean }>`
  transition: all .6s;
  overflow: ${p => p.isActive ? 'visible' : 'hidden'};
  opacity: ${p => p.isActive ? 1 : 0};
  height: ${p => !p.isActive && '0px'};
`

const UpdateUserDataWrapper = (props: UpdateUserDataWrapperPropType) => {
  const {locale} = useContext(LocaleContext)

  const {
    title,
    children,
    submitButtonText,
    submitFunction,
    isValid,
    isLoading,
    isServerError,
    serverErrorMessage,
    isWaitingForCode,
    setIsWaitingForCode,
    appUrl,
    returnPanelTitle,
    email,
    sendCodeUrl
  } = props

  return (
    <Container>
      <ReturnPanel appUrl={appUrl} title={returnPanelTitle} />
      <Text fontWeight={500} fontSize={36}>{title}</Text>
      <Wrapper>
       <ChildrenWrapper isActive={!isWaitingForCode}>
         {children}
         <ButtonWrapper>
           <TrustButton
             style='green'
             isValid={isValid}
             onClick={submitFunction}>
             {
               isLoading ?
                 <Spinner color="white" size={25}/>
                 :
                 <span>{submitButtonText}</span>
             }
           </TrustButton>
         </ButtonWrapper>
       </ChildrenWrapper>
        <AnimatedWrapper isActive={isServerError}>
          {isServerError && <ErrorMessage message={serverErrorMessage} title={'Password change error'}/>}
        </AnimatedWrapper>
      </Wrapper>
      <AnimatedWrapper isActive={isWaitingForCode}>
        {
          isWaitingForCode &&
          <TwoFA
            serverUrl={sendCodeUrl}
            email={email}
            isWaitingForCode={isWaitingForCode}
            setIsWaitingForCode={setIsWaitingForCode}
            appUrl={appUrl}
          />
        }
      </AnimatedWrapper>
    </Container>
  )
};

UpdateUserDataWrapper.defaultProps = UpdateUserDataWrapperDefaultProps

export default UpdateUserDataWrapper