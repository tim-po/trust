import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import Text from 'components/Text';
import FAQButtonIcon from 'icons/FAQButton'
import {JustifyStartColumn} from 'Standard/styles/GlobalStyledComponents'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

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
  width: 900px;
  z-index: 2;
  padding: 24px;
  padding-top: 12px;
  border: 1px solid #E8E8EB;
  cursor: pointer;
  margin-bottom: 16px;
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

const CompanyDescriptionWrapper = styled(JustifyStartColumn)<{ isActive: boolean }>`
  transition: all .6s;
  transform: ${p => p.isActive ? 'tscaleY(1)' : 'scaleY(0)'};
  opacity: ${p => p.isActive ? 1 : 0};
  overflow: ${p => p.isActive ? 'auto' : 'hidden'};
  background: #fff;
  max-width: 830px;
`

const TextWrapper = styled.div`
  max-width: 830px;
`

const FAQTile = (props: FAQTilePropType) => {
  const {locale} = useContext(LocaleContext)
  const {title, body} = props

  const [isDocumentsExtended, setIsDocumentsExtended] = useState<boolean>(false)

  const toggleFAQTile = () => {
    setIsDocumentsExtended(!isDocumentsExtended)
  }

  return (
      <JustifyStartColumn>
        <DocumentsContainer isExtended={isDocumentsExtended} onClick={toggleFAQTile}>
          <TextWrapper>
            <Text fontSize={20} fontWeight={600}>{title}</Text>
          </TextWrapper>
          <DocumentsContainerOpenCloseButton isExtended={isDocumentsExtended}>
            <FAQButtonIcon/>
          </DocumentsContainerOpenCloseButton>
          <div className={'mb-3'} />
          <CompanyDescriptionWrapper isActive={isDocumentsExtended}>
            <ReactMarkdown children={body} rehypePlugins={[rehypeRaw]} />
          </CompanyDescriptionWrapper>
        </DocumentsContainer>
      </JustifyStartColumn>
  )
};

FAQTile.defaultProps = FAQTileDefaultProps

export default FAQTile