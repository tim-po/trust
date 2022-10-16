import React, {useEffect, useState} from "react";
import StandardAppContainer from "Standard/StandardAppContainer";
import AppRouter from "router/AppRouter";
import Notification from 'components/Header/Buttons/Notification'
import FAQ from 'components/Header/Buttons/FAQ'
import ConnectorButton from "components/ConnectorButtons/ButtonExample";
import LogoutButton from "components/ConnectorButtons/Logout";
import AccountIcon from 'icons/Account';
import PaymentIcon from 'icons/PaymentMethod';
import SecurityIcon from 'icons/SecuritySettings';
import PersonalIcon from 'icons/PersonalData';
import LogoutIcon from 'icons/Logout';
import {HeaderButton} from "Standard/types/HeaderButton";
import {RouteName} from "router";
import {ConnectorButtonsEnum} from "types/ConnectorButtons";
import NavItem from "components/Header/Navigation";
import GradientCircles from "./Standard/decorations/GradientCircles";
import {NavItemsEnum} from "types/NavItems";
import {NavItems} from 'Standard/types/NavItems';
import UserStatusContext from 'context/UserStatusContext';
import {API_URL} from "./api/constants";
import {useCookies} from "react-cookie";

export const App = () => {

  const [isUserVerified, setIsUserVerified] = useState<boolean>(false)
  const [isUserSubmitted, setIsUserSubmitted] = useState<boolean>(false)

  const [cookies] = useCookies(['auth'])

  const buttons: HeaderButton[] = [
    <ConnectorButton text={ConnectorButtonsEnum.ACCOUNT} url={RouteName.ACCOUNT} icon={<AccountIcon/>}/>,
    <ConnectorButton text={ConnectorButtonsEnum.PERSONAL_DATA} url={RouteName.VERIFICATION} icon={<PersonalIcon/>}/>,
    <ConnectorButton text={ConnectorButtonsEnum.SECURITY_SETTINGS} url={RouteName.SECURITY} icon={<SecurityIcon/>}/>,
    <ConnectorButton text={ConnectorButtonsEnum.PAYMENT_INFORMATION} url={RouteName.PAYMENT_METHOD}
                     icon={<PaymentIcon/>}/>,
    <LogoutButton text={ConnectorButtonsEnum.LOGOUT} icon={<LogoutIcon/>} url={RouteName.LOGIN}/>,
  ]

  const navItems: NavItems[] = [
    <NavItem title={NavItemsEnum.INVEST} route={RouteName.INVEST}/>,
    <NavItem title={NavItemsEnum.MANAGE} route={RouteName.ALL_DEALS}/>,
  ]

  async function getStatusOfUser() {
    const userStatusUrl = `${API_URL}/api/validation/token`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      }
    };

    fetch(userStatusUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        setIsUserVerified(json.isVerified);
        setIsUserSubmitted(json.isSubmitted);
      })
      .catch(e => {
      })
  }

  useEffect(() => {
    getStatusOfUser()
  }, [])

  return (
    <StandardAppContainer
      headerNavigation={navItems}
      connectorButtons={buttons}
      logoHref={'/'}
      locales={['en', 'ja']}
      isDarkBG={false}
      version={"1.0.2"}
      headerButtons={[
        <FAQ/>,
        <Notification/>,
      ]}
    >
      <UserStatusContext.Provider value={{isUserVerified, isUserSubmitted}}>
        <AppRouter/>
        <GradientCircles/>
      </UserStatusContext.Provider>
    </StandardAppContainer>
  );
};

