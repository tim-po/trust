import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from "styled-components";
import Text from "components/Text";
import {JustifyStartColumn, SpaceBetweenRow, Row} from "Standard/styles/GlobalStyledComponents";
import TrustButton from "Standard/components/TrustButton";
import Modal from 'Standard/components/Modal'
import ChangeEmailModal from "components/Modals/ChangeEmail";
import ChangePhoneModal from "components/Modals/ChangePhone";
import ChangePasswordModal from "components/Modals/ChangePassword";
import DeleteAccountModal from "components/Modals/DeleteAccount";

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
  position: relative;
  min-width: 530px;
  width: max-content;
  min-height: 275px;
  height: max-content;
  background: #FFFFFF;
  border: 1px solid rgba(24, 24, 51, 0.1);
  border-radius: 16px;
  margin-top: 25px;
  z-index: 1;
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
  
  &:focus,
  &:active {
    outline: none
  }
  
  &:hover {
    color: rgba(87, 144, 255, .8)
  }
`

const DangerZoneBlock = styled(JustifyStartColumn)`
  padding: 32px;
`

const Account = (props: AccountPropType) => {
  const {locale} = useContext(LocaleContext)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

  return (
    <Container>
      <Text fontWeight={600} fontSize={40}>{localized(texts.title, locale)}</Text>
      <CardWrapper>
        <ContactInformationBlock gap={16}>
          <Text fontWeight={600} fontSize={20}>{localized(texts.contactInformation, locale)}</Text>
          <SpaceBetweenRow>
            <Text fontWeight={500} fontSize={16}>{localized(texts.email, locale)}</Text>
            <Row gap={12}>
              <Text fontWeight={400} fontSize={16}>mmpro@gmail.com</Text>
              <ChangeDataButton onClick={() => setShowEmailModal(true)}>{localized(texts.changeButton, locale)}</ChangeDataButton>
            </Row>
          </SpaceBetweenRow>
          <SpaceBetweenRow gap={16}>
            <Text fontWeight={500} fontSize={16}>{localized(texts.phone, locale)}</Text>
            <Row gap={12}>
              <Text fontWeight={400} fontSize={16}>88005553535</Text>
              <ChangeDataButton onClick={() => setShowPhoneModal(true)}>{localized(texts.changeButton, locale)}</ChangeDataButton>
            </Row>
          </SpaceBetweenRow>
        </ContactInformationBlock>
        <DangerZoneBlock gap={16}>
          <Text fontWeight={600} fontSize={20}>{localized(texts.dangerZone, locale)}</Text>
          <Row gap={8}>
            <TrustButton
              isValid
              style='black'
              rippleColor={'rgba(0, 0, 0, 0.2)'}
              onClick={() => setShowPasswordModal(true)}
            >
              {localized(texts.changePasswordButton, locale)}
            </TrustButton>
            <TrustButton
              isValid
              style='red'
              onClick={() => setShowDeleteAccountModal(true)}
            >
              {localized(texts.deleteAccountButton, locale)}
            </TrustButton>
          </Row>
        </DangerZoneBlock>
      </CardWrapper>
      {
        showEmailModal &&
        <Modal title={'Change Email'} onClose={setShowEmailModal}>
          <ChangeEmailModal />
        </Modal>
      }
      {
        showPhoneModal &&
        <Modal title={'Change Phone'} onClose={setShowPhoneModal}>
          <ChangePhoneModal />
        </Modal>
      }
      {
        showPasswordModal &&
        <Modal title={'Change Password'} onClose={setShowPasswordModal}>
          <ChangePasswordModal />
        </Modal>
      }
      {
        showDeleteAccountModal &&
        <Modal title={'Delete account'} onClose={setShowDeleteAccountModal}>
          <DeleteAccountModal />
        </Modal>
      }
    </Container>
  )
};

Account.defaultProps = AccountDefaultProps

export default Account

