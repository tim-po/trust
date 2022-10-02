import React, {useContext} from "react";
import LocaleContext from "../../Standard/LocaleContext";
import Text from '../Text';
import './index.css'
import styled from "styled-components";

type ErrorMessagePropType = {
  message: string
  title: string
}

const ErrorMessageDefaultProps = {
  message: '',
  title: 'Error signing in'
}

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 75px;
  background: rgba(200, 83, 72, .1);
  border-radius: 4px;
  margin-bottom: 25px;
  z-index: 1000;
`

const ErrorMessage = (props: ErrorMessagePropType) => {
  const {locale} = useContext(LocaleContext)

  const {message, title} = props

  return (
    <ErrorMessageContainer>
      <Text fontWeight={600} fontSize={16} color={'#C32604'} marginBottom={5}>{title}</Text>
      <Text fontWeight={500} fontSize={14} color={'#C32604'}>{message}</Text>
    </ErrorMessageContainer>
  )
};

ErrorMessage.defaultProps = ErrorMessageDefaultProps

export default ErrorMessage