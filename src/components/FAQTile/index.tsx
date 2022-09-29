import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import Text from 'components/Text';
import FAQButtonIcon from 'icons/FAQButton'
import {AlignCenterRow} from 'Standard/styles/GlobalStyledComponents'

type FAQTilePropType = {
  title: string,
  body: string
}

const FAQTileDefaultProps = {}

const DocumentsContainer = styled.div<{ isExtended: boolean }>`
  transition: all 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 0 27px rgba(94, 103, 120, 0.1);
  border-radius: 16px;
  max-height: ${p => p.isExtended ? '300px' : '60px'};
  margin-bottom: 16px;
  width: 864px;
  z-index: 2;
  padding: 24px;
  padding-top: 12px;
  border: 1px solid #E8E8EB;
  cursor: pointer;
`

const DocumentsContainerOpenCloseButton = styled.button<{ isExtended: boolean }>`
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  padding: 0;
  margin: 0;
  outline: none !important;
  border: none !important;
  width: 40px;
  height: 40px;
  right: 10px;
  z-index: -1;
  transform: ${p => p.isExtended ? 'rotate(180deg)' : 'rotate(0deg)'};
`

const FAQTile = (props: FAQTilePropType) => {
  const {locale} = useContext(LocaleContext)
  const {title, body} = props

  const [isDocumentsExtended, setIsDocumentsExtended] = useState<boolean>(false)

  const toggleFAQTile = () => {
    setIsDocumentsExtended(!isDocumentsExtended)
  }

  return (
    <DocumentsContainer isExtended={isDocumentsExtended} onClick={toggleFAQTile}>
        <Text fontSize={20} fontWeight={600}>{title}</Text>
        <DocumentsContainerOpenCloseButton isExtended={isDocumentsExtended}>
          <FAQButtonIcon/>
        </DocumentsContainerOpenCloseButton>
      <div style={{marginBottom: '16px'}}/>
      <Text fontWeight={400} fontSize={15} color={'rgba(24, 24, 51, .8)'}>{body}</Text>
    </DocumentsContainer>
  )
};

FAQTile.defaultProps = FAQTileDefaultProps

export default FAQTile