import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from 'styled-components';
import Text from 'components/Text'
import VerifiedWalletIcon from 'icons/VerifiedWallet';
import {AlignCenterRow, JustifyStartColumn, SpaceBetweenRow} from 'Standard/styles/GlobalStyledComponents'
import {useWeb3React} from "@web3-react/core";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import SimpleInput from "Standard/components/SimpleInput";
import TrustButton from 'Standard/components/TrustButton';
import Spinner from "Standard/components/Spinner";
import {HidingText} from "Standard/components/HidingText";
import {API_URL} from "api/constants";
import {useCookies} from "react-cookie";
import {useUserAccountInfo} from "hooks/useUserAccountInfo";
import TextLoader from "components/TextLoader";
import NoPageError from "Standard/components/404";

type PaymentMethodPropType = {}

const PaymentMethodDefaultProps = {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px;
  width: 100%;
`

const CardWrapper = styled(JustifyStartColumn)`
  position: relative;
  min-width: 460px;
  width: max-content;
  min-height: 275px;
  height: max-content;
  background: #FFFFFF;
  border: 1px solid rgba(24, 24, 51, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-top: 25px;
  z-index: 10;
`

const UnverifiedWalletIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(24, 24, 51, .5)
`

const SpinnerContainer = styled.div`
  position: absolute;
  right: 10px;
`

const CurrentWalletWrapper = styled.div`
  margin-top: 8px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  width: 180px;
`

const PaymentMethod = (props: PaymentMethodPropType) => {
  const {locale} = useContext(LocaleContext)
  const {fetchUserAccountInfo, email} = useUserAccountInfo(`${API_URL}/api/users/contacts`)
  const {account} = useWeb3React()

  const [cookies] = useCookies(['auth'])

  const [[wallet, setWallet], walletValid] = useValidatedState<string>('', validationFuncs.isAddress);

  const [verifiedWallets, setVerifiedWallets] = useState([])
  const [unverifiedWallets, setUnverifiedWallets] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isWalletsLoading, setIsWalletsLoading] = useState<boolean>(false)

  const [isServerError, setIsServerError] = useState<boolean>(false)

  const [isCopyShowing, setIsCopyShowing] = useState(false)

  async function copyTextToClipboard(text: string) {
    setIsCopyShowing(true)
    setTimeout(() => {
      setIsCopyShowing(false)
    }, 1500)
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  function truncate(str: string) {
    return str.length > 0
      ? str.substr(0, 8) + "..." + str.substr(str.length - 8, str.length - 1)
      : str;
  }

  const getUsersWallets = async () => {
    setIsWalletsLoading(true)

    const userWalletsUrl = `${API_URL}/api/wallets/token`

    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      }
    }

    fetch(userWalletsUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          const verifiedWallets = json.wallets.filter((wallet: any) => wallet.walletIsValid)
          const unverifiedWallets = json.wallets.filter((wallet: any) => !wallet.walletIsValid)
          setVerifiedWallets(verifiedWallets)
          setUnverifiedWallets(unverifiedWallets)
        } else {
          setIsServerError(true)
        }
      })
      .finally(() => setIsWalletsLoading(false))
  }

  const setAdditionalWallet = async () => {

    if (!walletValid) return

    setIsLoading(true)
    const setNewWalletUrl = `${API_URL}/api/wallets/add`

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
      body: JSON.stringify({
        login: email,
        address: wallet,
        type: 'additional'
      })
    }

    fetch(setNewWalletUrl, requestOptions)
      .then(res => res.json())
      .then(() => {
        setWallet('')
        getUsersWallets()
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchUserAccountInfo()
    getUsersWallets()
  }, [])

  return (
    <>
      {isServerError && <NoPageError isServerError={isServerError} />}
      {!isServerError && <Container>
        <Text fontWeight={600} fontSize={40}>{localized(texts.title, locale)}</Text>
        <CardWrapper gap={30}>
          <SpaceBetweenRow>
            <JustifyStartColumn>
              <AlignCenterRow gap={6}>
                <VerifiedWalletIcon/>
                <Text fontWeight={600} fontSize={20}>{localized(texts.verified, locale)}</Text>
              </AlignCenterRow>
              {verifiedWallets.length ? verifiedWallets.map((wallet: any) => <span key={wallet.address}>{truncate(wallet.address)}</span>) : <span>-</span>}
            </JustifyStartColumn>
            <JustifyStartColumn>
              <AlignCenterRow gap={6}>
                <UnverifiedWalletIcon/>
                <Text fontWeight={600} fontSize={20}>{localized(texts.unverified, locale)}</Text>
              </AlignCenterRow>
              {unverifiedWallets.length ? unverifiedWallets.map((wallet: any) => <span key={wallet.address}>{truncate(wallet.address)}</span>) : <span>-</span>}
            </JustifyStartColumn>
          </SpaceBetweenRow>
          <JustifyStartColumn>
            <Text fontWeight={500} fontSize={20}>{localized(texts.currentlyConnected, locale)}</Text>
            <CurrentWalletWrapper onClick={() => copyTextToClipboard(`${account}`)}>
              <HidingText
                defaultText={`${account}`}
                hidingText={`${localized(texts.copied, locale)}!`}
                peekOut={isCopyShowing}
              />
            </CurrentWalletWrapper>
          </JustifyStartColumn>
          <JustifyStartColumn>
            <SimpleLabelContainer>
              <SimpleInput
                onlyEmmitOnBlur
                required
                isValid={walletValid}
                onChangeRaw={setWallet}
                errorTooltipText={`${localized(texts.incorrectAddressWarning, locale)}`}
                inputProps={{
                  className: `w-full`,
                  placeholder: `${localized(texts.walletPlaceholder, locale)}`,
                  value: wallet
                }}
              />
            </SimpleLabelContainer>
            <ButtonWrapper>
              <TrustButton
                isValid={walletValid}
                onClick={setAdditionalWallet}
                style='green'
              >
                {
                  isLoading ?
                    <Spinner color={'#33CC66'} size={isLoading ? 25 : 0}/>
                    :
                    <span>{localized(texts.addWalletButton, locale)}</span>
                }
              </TrustButton>
            </ButtonWrapper>
          </JustifyStartColumn>
        </CardWrapper>
      </Container>}
    </>
  )
};

PaymentMethod.defaultProps = PaymentMethodDefaultProps

export default PaymentMethod

