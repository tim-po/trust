import React from "react";
import Login from 'pages/Login';
import Registration from "pages/Registration";
import Verification from "pages/Verification";
import PaymentMethod from "pages/PaymentMethod";
import Account from "pages/Account";
import FAQ from 'pages/FAQ';
import Manage from "pages/Manage";
import Invest from 'pages/Invest'
import NoPageError from "Standard/components/404";
import ChangeEmail from "pages/ChangeEmail";
import ChangePassword from "pages/ChangePassword";
import ChangePhone from "pages/ChangePhone";
import DeleteAccount from "pages/DeleteAccount";
import ChangeCommunicationMethod from "pages/ChangeCommunicationMethod";
import ForgotPassword from "pages/ForgotPassword";
import Deals from "pages/Deals";

export interface IRoute {
  path: string
  exact: boolean
  component: React.ComponentType
}

export enum RouteName {
  LOGIN = '/',
  REGISTRATION = '/registration',
  FORGOT_PASSWORD = '/forgot-password',

  VERIFICATION = '/verification',
  PAYMENT_METHOD = '/payment',
  ACCOUNT = '/account',
  FAQ = '/FAQ',
  SECURITY = '/security',
  INVEST = '/invest',
  MANAGE = '/manage',
  NOT_FOUND = '/not-found',
  CHANGE_EMAIL = '/change-email',
  CHANGE_PASSWORD = '/change-password',
  CHANGE_PHONE = '/change-phone-number',
  DELETE_ACCOUNT = '/delete-account',
  CHANGE_COMMUNICATION_METHOD = '/change-communication-method',
  ALL_DEALS = '/deals',
  CURRENT_DEAL = '/deals/:id'
}

export const publicRoutes: IRoute[] = [
  {path: RouteName.LOGIN, component: Login, exact: true},
  {path: RouteName.REGISTRATION, component: Registration, exact: true},
  {path: RouteName.FORGOT_PASSWORD, component: ForgotPassword, exact: true}
]

export const privateRoutes: IRoute[] = [
  {path: RouteName.VERIFICATION, component: Verification, exact: true},
  {path: RouteName.PAYMENT_METHOD, component: PaymentMethod, exact: true},
  {path: RouteName.ACCOUNT, component: Account, exact: true},
  {path: RouteName.FAQ, component: FAQ, exact: true},
  {path: RouteName.INVEST, component: Invest, exact: true},
  {path: RouteName.NOT_FOUND, component: NoPageError, exact: true},
  {path: RouteName.CHANGE_EMAIL, component: ChangeEmail, exact: true},
  {path: RouteName.CHANGE_PASSWORD, component: ChangePassword, exact: true},
  {path: RouteName.CHANGE_PHONE, component: ChangePhone, exact: true},
  {path: RouteName.DELETE_ACCOUNT, component: DeleteAccount, exact: true},
  {path: RouteName.CHANGE_COMMUNICATION_METHOD, component: ChangeCommunicationMethod, exact: true},
  {path: RouteName.ALL_DEALS, component: Deals, exact: true},
  {path: RouteName.CURRENT_DEAL, component: Manage, exact: true},
]