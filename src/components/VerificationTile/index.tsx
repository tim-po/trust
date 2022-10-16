import React, {useContext, ReactNode, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from 'styled-components';

interface StripProps {
}

type VerificationTilePropType = {
  children: ReactNode,
}

const VerificationTileDefaultProps = {}

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  background: #fff;
  overflow: hidden;
  margin-bottom: 50px;

  @media screen and (max-width: 900px) {
    padding-left: 25px;
    padding-right: 20px;
  }
`

const VerificationTile = (props: VerificationTilePropType) => {
  const {locale} = useContext(LocaleContext)
  const {children} = props

  return (
    <Tile>
      {children}
    </Tile>
  )
};

VerificationTile.defaultProps = VerificationTileDefaultProps

export default VerificationTile