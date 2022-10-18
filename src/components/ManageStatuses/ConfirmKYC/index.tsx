import React, {useContext, useEffect, useState} from 'react';
import StepItem from "Standard/components/Stepper/StepItem";
import {AlignCenterRow, JustifyStartColumn,} from "Standard/styles/GlobalStyledComponents";
import Text from "Standard/components/Text";
import {API_URL} from "api/constants";
import {UserData} from "types/UserData";
import {useCookies} from "react-cookie";
import UserStatusContext from "context/UserStatusContext";
import TrustButton from "Standard/components/TrustButton";
import {useHistory} from "react-router-dom";
import {RouteName} from "router";
import styled from "styled-components";
import {IDealActions, IDealStepStatus, StepStatusEnum, ActionStatusEnum} from "types/ManageStatus";
import {useParams} from "react-router";

type SignDocumentsProps = {
  status: IDealStepStatus,
  action: IDealActions,
  nextStep: (body: { desiredInvestmentAmount?: number }) => void,
}

const ButtonWrapper = styled.div`
  width: 180px;
`

const UserCardWrapper = styled(JustifyStartColumn)`
  border-radius: 16px;
  padding: 12px;
  border: 1px solid rgba(24, 24, 51, .1);
  width: max-content;
`

const ConfirmKYC = (props: SignDocumentsProps) => {
  const {status, action, nextStep} = props

  const history = useHistory()

  const {isUserVerified} = useContext(UserStatusContext)

  const [userData, setUserData] = useState<any>(undefined)

  const [cookies] = useCookies(['auth'])

  const params: { id: string } = useParams()

  async function getUserData() {
    const userDataUrl = `${API_URL}/api/validation/data`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      }
    };

    fetch(userDataUrl, requestOptions)
      .then(res => res.json())
      .then(userData => {
        if (userData.statusCode === 200) {
          setUserData(userData)
        }
      })
      .catch((e) => console.log(''))
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <StepItem status={status}>
      <JustifyStartColumn>
        <Text fontWeight={500} fontSize={20}>Confirm KYC</Text>
        <div className={'mb-2'}/>
        {status === StepStatusEnum.ACTIVE &&
          <>
            {action === ActionStatusEnum.USER_ACTION &&
              <>
                {isUserVerified ?
                  <JustifyStartColumn>
                    <Text fontWeight={400} fontSize={14}>You have successfully passed verification. You can proceed to the next step</Text>
                    <div className={'mb-3'}/>
                    <UserCardWrapper>
                      <Text fontWeight={400} fontSize={14}>{userData?.firstName?.value} {userData?.lastName?.value}</Text>
                      <Text fontWeight={400} fontSize={14}>{userData?.bDate?.value}</Text>
                      <Text fontWeight={400} fontSize={14}>{userData?.wallets?.main?.value}</Text>
                    </UserCardWrapper>
                    <div className={'mb-3'}/>
                    <ButtonWrapper>
                      <TrustButton style='green' onClick={() => nextStep({})} isValid>Next step</TrustButton>
                    </ButtonWrapper>
                  </JustifyStartColumn>
                  :
                  <JustifyStartColumn>
                    <Text fontWeight={400} fontSize={14}>To continue, you must complete KYC</Text>
                    <div className={'mb-2'}/>
                    <ButtonWrapper>
                      <TrustButton style='green' onClick={() => history.push(RouteName.VERIFICATION)} isValid>Confirm
                        KYC</TrustButton>
                    </ButtonWrapper>
                  </JustifyStartColumn>
                }
              </>
            }
            {action === ActionStatusEnum.ADMIN_ACTION &&
              <></>
            }
            {action === ActionStatusEnum.USER_ACTION_UNSUCCESSFUL &&
              <></>
            }
          </>
        }
      </JustifyStartColumn>
      <div className={'mb-4'}/>
    </StepItem>
  );
};

export default ConfirmKYC;