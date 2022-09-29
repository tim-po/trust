import React, {useCallback, useContext, useEffect, useState} from "react";
import texts from './localization'
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
  isLoading: boolean
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
  const {onChangeData, isSubmitted, documentsStatus, isLoading} = props

  const [activeButton, setActiveButton] = useState<number>(0)

  const [isFirstRender, setIsFirstRender] = useState(true)

  const [mainDoc, setMainDoc] = useState<any>(undefined)
  const [mainToken, setMainToken] = useState(undefined)
  const [additionalDoc, setAdditionalDoc] = useState<any>(undefined)
  const [additionalToken, setAdditionalToken] = useState(undefined)

  const [cookies] = useCookies(['auth']);

  const isValid = mainDoc !== "" && additionalDoc !== ""

  async function getUserToken(body: FormData) {
    const userTokenUrl = `${API_URL}/api/validation/upload`;

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
        if (additionalToken)
          body.append('token', additionalToken);
      case "main":
        if (mainToken)
          body.append('token', mainToken);
    }

    const response = await getUserToken(body)

    if (response && response.data.token)
      return response.data.token
  }

  const handleMainFileChange = (event: any) => {

    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      uploadFiles('main', event.target.files[0]).then(token => {
        setMainDoc(`${API_URL}/api/images/main/${cookies.auth}?${new Date().getTime()}`)
        setMainToken(token)
      })
    }
  }

  const handleAdditionalFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      uploadFiles('additional', event.target.files[0]).then(token => {
        setAdditionalDoc(`${API_URL}/api/images/additional/${cookies.auth}?${new Date().getTime()}`)
        setAdditionalToken(token)
      })
    }
  }

  const getUserPhotos = useCallback(() => {
    const photosUrl = `${API_URL}/api/images`

    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    };

    fetch(`${photosUrl}/main/${cookies.auth}?${new Date().getTime()}`, requestOptions)
      .then(res => {
        if (res.status === 200) {
          setMainDoc(res.url)
        } else {
          setMainDoc(undefined)
        }
      })

    fetch(`${photosUrl}/additional/${cookies.auth}?${new Date().getTime()}`, requestOptions)
      .then(res => {
        if (res.status === 200) {
          setAdditionalDoc(res.url)
        } else {
          setAdditionalDoc(undefined)
        }
      })
  }, [])

  useEffect(() => {
    getUserPhotos()
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
      data: {mainToken, additionalToken, type: "Passport"},
      isValid
    });
  }, [mainDoc, additionalDoc, mainToken, additionalToken, activeButton, isValid]);

  return (
    <VerificationTile isValid={isValid}>
      <Text fontSize={24} color={'#000'}>{localized(texts.tileTitle, locale)}</Text>
      <DocumentRulesGallery/>
      <DocumentTextRules />
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