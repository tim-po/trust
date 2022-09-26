import React, {useContext, ReactNode, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from 'styled-components';

interface StripProps {
  isValid: boolean
}

type VerificationTilePropType = {
  children: ReactNode,
  isValid: boolean
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

// const Strip = styled.div<StripProps>`
//   width: 12px;
//   height: 100%;
//   background: ${p => p.isValid ? '#33CC66' : '#D2D5DA'};
//   position: absolute;
//   left: 0;
//   top: 0;
//   transition: background 0.3s ease;
//
//   @media screen and (max-width: 900px) {
//    width: 8px;
//   }
// `

const VerificationTile = (props: VerificationTilePropType) => {
  const {locale} = useContext(LocaleContext)
  const {children, isValid} = props

  return (
    <Tile>
      {/*<Strip isValid={isValid}/>*/}
      {children}
    </Tile>
  )
};

VerificationTile.defaultProps = VerificationTileDefaultProps

export default VerificationTile