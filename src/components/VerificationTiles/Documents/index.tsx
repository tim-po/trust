import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import texts from './localization';
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import Text from "components/Text";
import VerificationTile from "components/VerificationTile";
import DocumentRulesGallery from "components/DocumentRulesGallery";
import './index.css';
import CameraIcon from 'icons/Camera';
import styled from "styled-components";
import {API_URL} from "api/constants";
import {useCookies} from "react-cookie";
import {InputsStatusEnum} from "types/Input";
import CheckMark from 'icons/CheckMark';
import DocumentTextRules from "components/DocumentTextRules";
import {FieldStatus} from "types/UserData";

type DocumentsPropType = {
  onChangeData: (data: any) => void
  isSubmitted: boolean,
  documentsStatus: {
    mainDocument: FieldStatus | undefined,
    additionalDocument: FieldStatus | undefined,
  },
  isLoading: boolean,
  setIsDocumentsError: (value: boolean) => void
}

const DocumentsDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const LoaderBlockWrapper = styled.div`
  position: relative;
  width: 190px;
  height: 103px;
  border-radius: 10px;
`

const BlurSquare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .3);
  position: absolute;
  top: 0;
  left: 0;
  width: 190px;
  height: 103px;
  border-radius: 10px;

  svg {
    width: 36px;
    height: 36px;
  }
`

const Documents = (props: DocumentsPropType) => {
  const {locale} = useContext(LocaleContext)
  const ref = useRef()
  const {onChangeData, isSubmitted, documentsStatus, isLoading, setIsDocumentsError} = props
  const [activeButton, setActiveButton] = useState<number>(0)

  const [isFirstRender, setIsFirstRender] = useState(true)

  const [mainDoc, setMainDoc] = useState<any>(undefined)
  const [additionalDoc, setAdditionalDoc] = useState<any>(undefined)

  const [token, setToken] = useState(undefined)

  const [cookies] = useCookies(['auth']);

  const isValid = mainDoc !== "" && additionalDoc !== ""

  async function getUserToken(body: FormData) {
    const userTokenUrl = `${API_URL}/api/images/upload`;

    const response = await fetch(userTokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': cookies.auth
      },
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body
    })

    return response.json()
  }

  async function uploadFiles(documentImportantType: 'main' | 'additional', file: any) {
    const body = new FormData()
    body.append('attachment', file);
    body.append('type', documentImportantType);

    switch (documentImportantType) {
      case "additional":
        if (token)
          body.append('token', token);
      case "main":
        if (token)
          body.append('token', token);
    }

    const response = await getUserToken(body)

    if (response && response.token)
      return response.token
  }

  const handleMainFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      uploadFiles('main', event.target.files[0]).then(token => {
        setMainDoc(`${API_URL}/api/images/main/${cookies.auth}?${new Date().getTime()}`)
        setToken(token)
      })
    }
  }

  const handleAdditionalFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      uploadFiles('additional', event.target.files[0]).then(token => {
        setAdditionalDoc(`${API_URL}/api/images/additional/${cookies.auth}?${new Date().getTime()}`)
        setToken(token)
      })
    }
  }

  useEffect(() => {
    setMainDoc(`${API_URL}/api/images/main/${cookies.auth}?${new Date().getTime()}`)
    setAdditionalDoc(`${API_URL}/api/images/additional/${cookies.auth}?${new Date().getTime()}`)
  }, [])

  function setDocumentsInner(documents: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem('documents', JSON.stringify(documents.data))
      onChangeData(documents)
    } else {
      setIsFirstRender(false)
    }
  }

  useEffect(() => {
    setDocumentsInner({
      data: {token, type: "Passport"},
      isValid
    });
  }, [mainDoc, additionalDoc, token, activeButton, isValid]);

  return (
    <VerificationTile isValid={isValid}>
      <Text fontSize={24} color={'#000'}>{localized(texts.tileTitle, locale)}</Text>
      <DocumentRulesGallery/>
      <DocumentTextRules/>
      <FlexWrapper>
        <LoaderBlockWrapper className={`${isLoading && 'skeleton'}`}>
          {(documentsStatus.mainDocument?.status === InputsStatusEnum.VERIFIED || documentsStatus.mainDocument?.status === InputsStatusEnum.PROCESSING_BY_ADMIN)
            &&
            <BlurSquare>
              {documentsStatus.mainDocument?.status === InputsStatusEnum.VERIFIED && <CheckMark/>}
            </BlurSquare>
          }
          <label className="file-select">
            <div className="select-button">
              {
                (mainDoc || (documentsStatus.mainDocument?.status === InputsStatusEnum.VERIFIED || documentsStatus.mainDocument?.status === InputsStatusEnum.PROCESSING_BY_ADMIN))
                  ?
                  <img src={mainDoc} alt="preview image"/>
                  :
                  <>
                    <CameraIcon/>
                    {localized(texts.uploadMainPage, locale)}
                  </>
              }
            </div>
            <input type="file" onChange={handleMainFileChange}/>
          </label>
        </LoaderBlockWrapper>
        <LoaderBlockWrapper className={`${isLoading && 'skeleton'}`}>
          {(documentsStatus.additionalDocument?.status === InputsStatusEnum.VERIFIED || documentsStatus.additionalDocument?.status === InputsStatusEnum.PROCESSING_BY_ADMIN)
            &&
            <BlurSquare>
              {documentsStatus.additionalDocument?.status === InputsStatusEnum.VERIFIED && <CheckMark/>}
            </BlurSquare>
          }
          <label className="file-select">
            <div className="select-button">
              {
                (additionalDoc || (documentsStatus.additionalDocument?.status === InputsStatusEnum.VERIFIED || documentsStatus.additionalDocument?.status === InputsStatusEnum.PROCESSING_BY_ADMIN))
                  ?
                  <img src={additionalDoc} alt="preview image"/>
                  :
                  <>
                    <CameraIcon/>
                    {localized(texts.uploadRegistrationPage, locale)}
                  </>
              }
            </div>
            <input type="file" onChange={handleAdditionalFileChange}/>
          </label>
        </LoaderBlockWrapper>
      </FlexWrapper>
    </VerificationTile>
  )
};

Documents.defaultProps = DocumentsDefaultProps

export default Documents