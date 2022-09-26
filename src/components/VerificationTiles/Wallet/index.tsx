import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import {Checkbox} from "antd";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import {FieldStatus, InputsStatusEnum} from "../../../types";
import useIsFirstRender from "../../../Standard/hooks/useIsFirstRender";
import setInnerValueInLocalStorage from "../../../utils/setInnerValueInLocalStorage";
import CheckMark from "../../../icons/CheckMark";

type WalletVerificationPropType = {
  onChangeData: (data: any) => void,
  fieldStatus: {
    wallet: FieldStatus | undefined
  },
  isLoading: boolean
}

const WalletVerificationDefaultProps = {};

const WalletVerification = (props: WalletVerificationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData, fieldStatus, isLoading} = props;


  const [[wallet, setTransferAddress], transferAddressValid] = useValidatedState<string>("", validationFuncs.isAddress);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);

  const [localStorageData, setLocalStorageData] = useState({
    wallet: '',
    isBSCNetwork: checkboxChecked
  })

  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('wallet', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

  // function setWalletInner(wallet: { data: {}, isValid: boolean }) {
  //   if (!isFirstRender) {
  //     localStorage.setItem('wallet', JSON.stringify(wallet.data))
  //     onChangeData(wallet)
  //   }
  // }

  useEffect(() => {
    setInnerValueInLocalStorage(
      {data: {wallet, isBSCNetwork: checkboxChecked}, isValid: (checkboxChecked && transferAddressValid)},
      'wallet',
      isFirstRender,
      onChangeData
    )
    //setWalletInner({data: {wallet, isBSCNetwork: checkboxChecked}, isValid: (checkboxChecked && transferAddressValid)});
  }, [wallet, transferAddressValid, checkboxChecked]);

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    const parsed = JSON.parse(`${wallet}`)
    if (parsed) {
      setLocalStorageData(parsed);
    }
    if (localStorageData.wallet) {
      setTransferAddress(localStorageData.wallet)
    }
    if (localStorageData.isBSCNetwork) {
      setCheckboxChecked(localStorageData.isBSCNetwork)
    }
  }, [isFirstRender, localStorageData.wallet])

  const onChange = (e: CheckboxChangeEvent) => {
    setCheckboxChecked(e.target.checked)
  };

  return (
    <VerificationTile isValid={transferAddressValid && checkboxChecked}>
      <Text fontSize={24} color={"#000"}>{localized(texts.tileTitle, locale)}</Text>
      <div className="flex">
        <SimpleLabelContainer>
          <SimpleInput
            onlyEmmitOnBlur
            displayAsLabel={
              fieldStatus.wallet?.status === InputsStatusEnum.VERIFIED ||
              fieldStatus.wallet?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
            }
            required
            isValid={transferAddressValid}
            onChangeRaw={setTransferAddress}
            errorTooltipText={`${localized(texts.incorrectAddressWarning, locale)}`}
            inputProps={{
              className: `w-full ${isLoading && 'skeleton'}`,
              placeholder: `${localized(texts.walletPlaceholder, locale)}`,
              value: wallet
            }}
          />
        </SimpleLabelContainer>
        {fieldStatus.wallet && fieldStatus.wallet.status === InputsStatusEnum.VERIFIED && <CheckMark/>}
      </div>
      <Checkbox
        onChange={onChange}
        checked={checkboxChecked}
        disabled={
          fieldStatus.wallet?.status === InputsStatusEnum.VERIFIED ||
          fieldStatus.wallet?.status === InputsStatusEnum.PROCESSING_BY_ADMIN
        }
      >{localized(texts.checkBSCNetwork, locale)}</Checkbox>
    </VerificationTile>
  );
};

WalletVerification.defaultProps = WalletVerificationDefaultProps;

export default WalletVerification;