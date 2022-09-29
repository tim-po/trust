import React from "react";
import StandardAppContainer from "Standard/StandardAppContainer";
import AppRouter from "router/AppRouter";
import Notification from 'components/Header/Buttons/Notification'
import FAQ from 'components/Header/Buttons/FAQ'
import Email from 'components/Header/Email'
import ConnectorButton from "components/ConnectorButtonExample";
import AccountIcon from 'icons/Account';
import PaymentIcon from 'icons/PaymentMethod';
import SecurityIcon from 'icons/SecuritySettings';
import PersonalIcon from 'icons/PersonalData';
import LogoutIcon from 'icons/Logout';
import {HeaderButton} from "Standard/types";
import {RouteName} from "router";
import {ConnectorButtonsEnum, NavItems, NavItemsEnum} from "types";
import NavItem from "components/Header/Navigation";
import GradientCircles from "./Standard/decorations/GradientCircles";
import {useCookies} from "react-cookie";

export const App = () => {

  const [cookies, setCookies] = useCookies(["auth"]);

  const buttons: HeaderButton[] = [
    <ConnectorButton text={ConnectorButtonsEnum.ACCOUNT} url={RouteName.ACCOUNT} icon={<AccountIcon />} />,
    <ConnectorButton text={ConnectorButtonsEnum.PERSONAL_DATA} url={RouteName.VERIFICATION} icon={<PersonalIcon />} />,
    <ConnectorButton text={ConnectorButtonsEnum.SECURITY_SETTINGS} url={RouteName.SECURITY} icon={<SecurityIcon />} />,
    <ConnectorButton text={ConnectorButtonsEnum.PAYMENT_INFORMATION} url={RouteName.PAYMENT_METHOD} icon={<PaymentIcon />} />,
    <ConnectorButton text={ConnectorButtonsEnum.LOGOUT} icon={<LogoutIcon /> }/>,
  ]

  const navItems: NavItems[] = [
    <NavItem title={NavItemsEnum.INVEST} route={RouteName.INVEST} />,
    <NavItem title={NavItemsEnum.MANAGE} route={RouteName.MANAGE} />,
  ]

  return (
    <StandardAppContainer
      headerNavigation={navItems}
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
      <>
        <AppRouter/>
        <GradientCircles />
      </>
    </StandardAppContainer>
  );
};

