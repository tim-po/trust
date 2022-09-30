import React, {useContext} from 'react';
import {localized} from "Standard/hooks/localized";
import LocaleContext from "Standard/LocaleContext";
import {NavItemsEnum} from "types/NavItems";
import texts from './localization'
import styled from "styled-components";
import {useHistory} from "react-router-dom";

type NavItemProps = {
  title: NavItemsEnum,
  route: string
}

const Link = styled.div`
  color: #181833;
  text-transform: uppercase;
  font-weight: 500;
  margin-right: 50px;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s 0.2s ease;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #33CC66;
    bottom: -4px;
    border-radius: 4px;
    transition: all 0.4s cubic-bezier(0.82, 0.02, 0.13, 1.26);
    left: 100%;
  }

  &:hover {
    opacity: 1;
    color: #33CC66;

    &:before {
      width: 40px;
      left: 0;
    }
  }
`

const NavItem = (props: NavItemProps) => {
  const {title, route} = props
  const {locale} = useContext(LocaleContext)
  const history = useHistory()

  return <Link onClick={() => history.push(route)}>{localized(texts[title], locale)}</Link>
};

export default NavItem;