import React from "react";
import Login from 'pages/Login';
import Registration from "pages/Registration";
import Verification from "pages/Verification";
import PaymentMethod from "pages/PaymentMethod";
import Account from "pages/Account";
import FAQ from 'pages/FAQ';

export interface IRoute {
  path: string
  exact: boolean
  component: React.ComponentType
}

export enum RouteName {
  LOGIN = '/',
  REGISTRATION = '/registration',
  VERIFICATION = '/verification',
  PAYMENT_METHOD = '/payment',
  ACCOUNT = '/account',
  FAQ = '/FAQ',
  SECURITY = 'security',

}

export const publicRoutes: IRoute[] = [
  {path: RouteName.LOGIN, component: Login, exact: true},
  {path: RouteName.REGISTRATION, component: Registration, exact: true},
]

export const privateRoutes: IRoute[] = [
  {path: RouteName.VERIFICATION, component: Verification, exact: true},
  {path: RouteName.PAYMENT_METHOD, component: PaymentMethod, exact: true},
  {path: RouteName.ACCOUNT, component: Account, exact: true},
  {path: RouteName.FAQ, component: FAQ, exact: true},
]