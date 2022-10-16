import React, {useContext} from 'react';
import {localized} from "Standard/hooks/localized";
import LocaleContext from "Standard/LocaleContext";
import {NavItemsEnum} from "types/NavItems";
import texts from './localization'
import {useHistory} from "react-router-dom";
import {StyledLink} from 'styles/StyledComponents'

type NavItemProps = {
  title: NavItemsEnum,
  route: string
}

const NavItem = (props: NavItemProps) => {
  const {title, route} = props
  const {locale} = useContext(LocaleContext)
  const history = useHistory()

  return <StyledLink onClick={() => history.push(route)}>{localized(texts[title], locale)}</StyledLink>
};

export default NavItem;