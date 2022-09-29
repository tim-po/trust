import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import texts from './localization'
import {localized} from 'Standard/utils/localized';
import LocaleContext from 'Standard/LocaleContext'
import {ConnectorButtonsEnum} from "types/ConnectorButtons";

type ConnectorButtonProps = {
  text: ConnectorButtonsEnum;
  url?: string | undefined;
  icon: React.ReactElement;
  onClick?: () => void;
}

const ConnectorButton = (props: ConnectorButtonProps) => {
  const {text, url, icon, onClick} = props
  const history = useHistory()
  const {locale} = useContext(LocaleContext)

  const historyPush = () => {
    if (url) history.push(url)
  }

  return (
    <button
      className={`connection-button`}
      onClick={() => {
        onClick !== undefined && onClick()
        historyPush()
      }}
    >
      {icon}
      <div style={{marginRight: 12}}/>
      {localized(texts[text], locale)}
    </button>
  )
}

export default ConnectorButton;