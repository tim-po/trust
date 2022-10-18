import React from 'react';
import StepItem from "Standard/components/Stepper/StepItem";
import {AlignCenterRow, JustifyStartColumn} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import TrustButton from "Standard/components/TrustButton";
import styled from "styled-components";
import {IDealActions, IDealStepStatus, StepStatusEnum, ActionStatusEnum} from "types/ManageStatus";

type WaitDealConfirmationProps = {
  status: IDealStepStatus,
  action: IDealActions,
  nextStep: (body: { desiredInvestmentAmount?: number }) => void,
  adminErrorMessage?: string
}

const ButtonWrapper = styled.div`
  width: 180px;
`

const DepositFunds = (props: WaitDealConfirmationProps) => {
  const {status, action, nextStep, adminErrorMessage} = props
  return (
    <StepItem status={status}>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={20}>Deposit Funds</Text>
        <div className={'mb-2'}/>
        {status === StepStatusEnum.ACTIVE &&
          <>
            {(action === ActionStatusEnum.USER_ACTION || action === ActionStatusEnum.USER_ACTION_UNSUCCESSFUL) &&
              <>
                <JustifyStartColumn>
                  {adminErrorMessage && <Text fontWeight={400} fontSize={14} color={'#e73d3d'}><strong>Message from manager:</strong> {adminErrorMessage}</Text>}
                  <div className={'mb-4'}/>
                  <AlignCenterRow gap={10}>
                    <Text fontWeight={600} fontSize={16}>IMPORTANT:</Text>
                    <Text fontWeight={400} fontSize={14}>Always check the network you’re using to avoid losing your
                      funds.</Text>
                  </AlignCenterRow>
                  <div className={'mb-2'}/>
                  <JustifyStartColumn gap={5}>
                    <Text fontWeight={600} fontSize={16}>ERC-20, BEP-20 transfer details:</Text>
                    <Text fontWeight={400} fontSize={14}>Wallet: 0x82FFe2b9e3724656a53f87a620830C36E992889c</Text>
                    <Text fontWeight={400} fontSize={14}>Coin: USDT, USDC, BUSD</Text>
                  </JustifyStartColumn>
                  <div className={'mb-2'}/>
                  <JustifyStartColumn gap={5}>
                    <Text fontWeight={600} fontSize={16}>TRC-20 transfer details:</Text>
                    <Text fontWeight={400} fontSize={14}>Wallet: TAdqEKJFAXyomd7h1kgd1oDbii6b8d779V</Text>
                    <Text fontWeight={400} fontSize={14}>Coin: TRON USDT, TRON USDC</Text>
                  </JustifyStartColumn>
                  <div className={'mb-2'}/>
                  <JustifyStartColumn gap={5}>
                    <Text fontWeight={600} fontSize={16}>How it works?</Text>
                    <Text fontWeight={400} fontSize={14}>1. Check the wallet network.</Text>
                    <Text fontWeight={400} fontSize={14}>2. Open your wallet app and transfer money.</Text>
                    <Text fontWeight={400} fontSize={14}>3. Complete this step by clicking the button below.</Text>
                  </JustifyStartColumn>
                  <div className={'mb-4'}/>
                  <ButtonWrapper>
                    <TrustButton style='green' isValid onClick={() => nextStep({})}>I transferred money</TrustButton>
                  </ButtonWrapper>
                </JustifyStartColumn>
              </>
            }
            {action === ActionStatusEnum.ADMIN_ACTION &&
              <Text fontWeight={400} fontSize={14}>The manager will check your payment soon.</Text>
            }
          </>
        }
      </JustifyStartColumn>
      <div className={'mb-4'}/>
    </StepItem>
  );
};

export default DepositFunds;