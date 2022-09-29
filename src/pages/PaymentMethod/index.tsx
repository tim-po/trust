import React, {useContext, useState} from "react";
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

const PaymentMethod = (props: PaymentMethodPropType) => {
  const {locale} = useContext(LocaleContext)
  const {account} = useWeb3React()

  const [[wallet, setTransferAddress], transferAddressValid] = useValidatedState<string>("", validationFuncs.isAddress);

  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <Container>
      <Text fontWeight={600} fontSize={25}>{localized(texts.title, locale)}</Text>
      <CardWrapper gap={30}>
        <SpaceBetweenRow>
          <JustifyStartColumn>
            <AlignCenterRow gap={6}>
              <VerifiedWalletIcon/>
              <Text fontWeight={600} fontSize={20}>{localized(texts.verified, locale)}</Text>
            </AlignCenterRow>
            <span>0x4673..411</span>
          </JustifyStartColumn>
          <JustifyStartColumn>
            <AlignCenterRow gap={6}>
              <UnverifiedWalletIcon/>
              <Text fontWeight={600} fontSize={20}>{localized(texts.unverified, locale)}</Text>
            </AlignCenterRow>
            <span>0x4673..411</span>
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
              isValid={transferAddressValid}
              onChangeRaw={setTransferAddress}
              errorTooltipText={`${localized(texts.incorrectAddressWarning, locale)}`}
              inputProps={{
                className: `w-full`,
                placeholder: `${localized(texts.walletPlaceholder, locale)}`,
                value: wallet
              }}
            />
          </SimpleLabelContainer>
          <TrustButton
            isValid={transferAddressValid}
            onClick={() => {}}
            style='green'
          >
            <SpinnerContainer>
              <Spinner color={'#33CC66'} size={isLoading ? 25 : 0}/>
            </SpinnerContainer>
            {localized(texts.addWalletButton, locale)}
          </TrustButton>
        </JustifyStartColumn>
      </CardWrapper>
    </Container>
  )
};

PaymentMethod.defaultProps = PaymentMethodDefaultProps

export default PaymentMethod

