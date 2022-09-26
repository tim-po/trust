import React, {useContext} from "react";
import StandardAppContainer from "Standard/StandardAppContainer";
import AppRouter from "router/AppRouter";
import Notification from 'components/HeaderButtons/Notification'
import FAQ from 'components/HeaderButtons/FAQ'
import Email from 'components/HeaderButtons/Email'
import {useCookies} from "react-cookie";
import ConnectorButton from "components/ConnectorButtonExample";
import texts from 'components/ConnectorButtonExample/localization';
import {localized} from 'Standard/utils/localized';
import LocaleContext from 'Standard/LocaleContext';
import AccountIcon from 'icons/Account';
import PaymentIcon from 'icons/PaymentMethod';
import SecurityIcon from 'icons/SecuritySettings';
import PersonalIcon from 'icons/PersonalData';
import LogoutIcon from 'icons/Logout';
import {HeaderButton} from "Standard/components/WalletConnector";
import {RouteName} from "router";

export const App = () => {
  const {locale} = useContext(LocaleContext)
  const [cookies] = useCookies(["auth"])

  const buttons: HeaderButton[] = [
    <ConnectorButton text={localized(texts.account, locale)} url={RouteName.ACCOUNT} icon={<AccountIcon />} />,
    <ConnectorButton text={localized(texts.personalData, locale)} url={RouteName.VERIFICATION} icon={<PersonalIcon />} />,
    <ConnectorButton text={localized(texts.securitySettings, locale)} url={RouteName.SECURITY} icon={<SecurityIcon />} />,
    <ConnectorButton text={localized(texts.paymentInformation, locale)} url={RouteName.PAYMENT_METHOD} icon={<PaymentIcon />} />,
    <ConnectorButton text={localized(texts.logout, locale)} icon={<LogoutIcon />} />,
  ]

  return (
    <StandardAppContainer
      connectorButtons={buttons}
      logoHref={'/'}
      locales={['en', 'ja']}
      isDarkBG={false}
      version={"1.0.2"}
      headerButtons={[
        <Email/>,
        <FAQ/>,
        <Notification/>,
      ]}
    >
      <AppRouter/>
    </StandardAppContainer>
  );
};

