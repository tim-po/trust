import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import styled from 'styled-components'
import {localized} from "Standard/hooks/localized";
import LocaleContext from "Standard/LocaleContext";
import {NavItemsEnum} from "types/NavItems";
import texts from './localization'

type NavItemProps = {
  title: NavItemsEnum,
  route: string
}

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  font-size: 16px;
  color: rgba(23, 24, 51, .5)
`

const NavItem = (props: NavItemProps) => {
  const {title, route} = props
  const {locale} = useContext(LocaleContext)

  return <StyledNavLink
    to={`${route}`}
    activeStyle={{color: '#33CC66'}}
  >
    {localized(texts[title], locale)}
  </StyledNavLink>
};

export default NavItem;