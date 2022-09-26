import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled, {css} from "styled-components";
import Text from "components/Text";
import {JustifyStartColumn, SpaceBetweenRow, Row, ButtonV3} from "styles/GlobalStyledComponents";

type AccountPropType = {}

const AccountDefaultProps = {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
`

const CardWrapper = styled(JustifyStartColumn)`
  min-width: 530px;
  width: max-content;
  min-height: 275px;
  height: max-content;
  background: #FFFFFF;
  border: 1px solid rgba(24, 24, 51, 0.1);
  border-radius: 16px;
  margin-top: 25px;
`

const ContactInformationBlock = styled(JustifyStartColumn)`
  padding: 32px;
  border-bottom: 1px solid rgba(24, 24, 51, .1);
`

const ChangeDataButton = styled.button`
  border: 0;
  background: none;
  text-decoration-line: underline;
  color: #5790FF;
  font-weight: 500;
  font-size: 16px;
`

const DangerZoneBlock = styled(JustifyStartColumn)`
  padding: 32px;
`

const Account = (props: AccountPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <Container>
      <Text fontWeight={600} fontSize={25}>Account</Text>
      <CardWrapper>
        <ContactInformationBlock gap={16}>
          <Text fontWeight={600} fontSize={20}>Contact information</Text>
          <SpaceBetweenRow>
            <Text fontWeight={500} fontSize={16}>Email</Text>
            <Row gap={12}>
              <Text fontWeight={400} fontSize={16}>mmpro@gmail.com</Text>
              <ChangeDataButton>Change</ChangeDataButton>
            </Row>
          </SpaceBetweenRow>
          <SpaceBetweenRow gap={16}>
            <Text fontWeight={500} fontSize={16}>Phone</Text>
            <Row gap={12}>
              <Text fontWeight={400} fontSize={16}>88005553535</Text>
              <ChangeDataButton>Change</ChangeDataButton>
            </Row>
          </SpaceBetweenRow>
        </ContactInformationBlock>
        <DangerZoneBlock gap={16}>
          <Text fontWeight={600} fontSize={20}>Danger zone</Text>
          <Row gap={8}>
            <ButtonV3 buttonStyle='black'>Change password</ButtonV3>
            <ButtonV3 buttonStyle='red'>Delete Account</ButtonV3>
          </Row>
        </DangerZoneBlock>
      </CardWrapper>
    </Container>
  )
};

Account.defaultProps = AccountDefaultProps

export default Account

