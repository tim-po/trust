import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "Standard/LocaleContext";
import {localized} from "Standard/utils/localized";
import styled from 'styled-components';
import Text from 'components/Text'
import VerifiedWalletIcon from 'icons/VerifiedWallet';
import {AlignCenterRow, JustifyStartColumn, SpaceBetweenRow} from 'styles/GlobalStyledComponents'
import {useWeb3React} from "@web3-react/core";
import useValidatedState, {validationFuncs} from "Standard/hooks/useValidatedState";
import SimpleLabelContainer from "Standard/components/SimpleLabelContainer";
import SimpleInput from "Standard/components/SimpleInput";
import ButtonV2 from "Standard/components/ButtonV2";

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
  min-width: 415px;
  width: max-content;
  min-height: 275px;
  height: max-content;
  background: #FFFFFF;
  border: 1px solid rgba(24, 24, 51, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-top: 25px;
`

const UnverifiedWalletIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(24, 24, 51, .5)
`

const PaymentMethod = (props: PaymentMethodPropType) => {
  const {locale} = useContext(LocaleContext)
  const {account} = useWeb3React()

  const [[wallet, setTransferAddress], transferAddressValid] = useValidatedState<string>("", validationFuncs.isAddress);

  return (
    <Container>
      <Text fontWeight={600} fontSize={25}>Payment Method</Text>
      <CardWrapper gap={30}>
        <SpaceBetweenRow>
          <JustifyStartColumn>
            <AlignCenterRow gap={6}>
              <VerifiedWalletIcon/>
              <Text fontWeight={600} fontSize={20}>Verified</Text>
            </AlignCenterRow>
            <span>0x4673..411</span>
          </JustifyStartColumn>
          <JustifyStartColumn>
            <AlignCenterRow gap={6}>
              <UnverifiedWalletIcon/>
              <Text fontWeight={600} fontSize={20}>Unverified</Text>
            </AlignCenterRow>
            <span>0x4673..411</span>
          </JustifyStartColumn>
        </SpaceBetweenRow>
        <JustifyStartColumn>
          <Text fontWeight={500} fontSize={20}>Currently connected</Text>
          <Text fontWeight={400} fontSize={16}>{account}</Text>
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
          <ButtonV2 isValid={transferAddressValid} onClick={() => {}}>Add</ButtonV2>
        </JustifyStartColumn>
      </CardWrapper>
    </Container>
  )
};

PaymentMethod.defaultProps = PaymentMethodDefaultProps

export default PaymentMethod

